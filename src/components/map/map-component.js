import React, { useState, useRef, useEffect } from 'react';
import { transformRequest } from './map-utils';
import { useScrollFunctionality, useHandleResize } from './map-hooks';
import ReactMapGL, { Marker } from 'react-map-gl';
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Map = (props) => {
  const { chapters, accessToken, mapStyle, showMarkers, setCurrentChapter, externalLayers, currentChapterId, currentAction } = props;
  const [loaded, setLoaded] = useState(false);
  const [externalLayersOpacity, setExternalLayersOpacity] = useState({});
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  // Cache for dynamically generated marker images (e.g. SVG with a specific color)
  // Keyed by a stable string so we don't re-add images unnecessarily.
  const markerImageCacheRef = useRef(new Set());

  const getMarkerStyleFromAction = (action) => {
    // Configure the animated "head" marker (the dot moving along the track).
    //
    // IMPORTANT: In this template, your chapter action usually looks like:
    //   { callback: "trackAnimation.start", options: { trackFile, speed, marker: {...} } }
    //
    // So marker config is typically under action.options.marker (not action.marker).
    //
    // Fallbacks:
    // - If action is already the options object, it can be action.marker
    // - If trackAnimation.start was called, we also store the last marker on window.__TRACK_MARKER__
    const marker =
      action?.options?.marker ||
      action?.marker ||
      (typeof window !== 'undefined' ? window.__TRACK_MARKER__ : null) ||
      {};

    return {
      type: marker.type || 'circle',
      // SVG can be either:
      //  - a URL starting with "/" or "http"
      //  - an inline SVG string (must include "<svg")
      svg: marker.svg || null,
      // For SVG markers, setting `useOriginalColors: true` keeps the SVG's own colors.
      useOriginalColors: marker.useOriginalColors === true,
      color: marker.color || '#e46d6e',
      size: typeof marker.size === 'number' ? marker.size : 1,
      rotate: typeof marker.rotate === 'number' ? marker.rotate : 0,
      borderColor: marker.borderColor || null,
      borderWidth: typeof marker.borderWidth === 'number' ? marker.borderWidth : 0,
      circleRadius: typeof marker.circleRadius === 'number' ? marker.circleRadius : 6,
      circleStrokeWidth: typeof marker.circleStrokeWidth === 'number' ? marker.circleStrokeWidth : 0.5,
      circleStrokeColor: marker.circleStrokeColor || '#fafafa'
    };
  };

  
  const buildStyledSvg = (rawSvg, { fillColor, strokeColor, strokeWidth, useOriginalColors }) => {
    if (!rawSvg || typeof rawSvg !== 'string') return null;

    const hasStroke = strokeColor && typeof strokeWidth === 'number' && strokeWidth > 0;

    // If the user wants to keep the SVG's original colors and no border is requested,
    // return as-is.
    if (useOriginalColors === true && !hasStroke) return rawSvg;

    const safeFill = fillColor || null;
    const safeStroke = strokeColor || null;
    const safeStrokeWidth = hasStroke ? strokeWidth : 0;

    // Inject CSS so shapes inherit requested colors/border.
    // Preserve explicit "none" fills/strokes.
    //
    // Notes:
    // - For monochrome SVGs, fillColor + borderColor works well.
    // - If useOriginalColors=true and border is requested, fills remain but strokes are forced.
    const css = `
      <style>
        ${useOriginalColors === true ? '' : (safeFill ? `* { fill: ${safeFill} !important; }` : '')}
        ${hasStroke ? `* { stroke: ${safeStroke} !important; stroke-width: ${safeStrokeWidth} !important; }` : ''}
        [fill="none"] { fill: none !important; }
        [stroke="none"] { stroke: none !important; }
      </style>
    `;

    return rawSvg.replace(/<svg(\s[^>]*)?>/i, (m) => `${m}${css}`);
  };


  const fetchSvgText = async (svg) => {
    if (!svg) return null;
    if (typeof svg !== 'string') return null;
    if (svg.trim().startsWith('<svg')) return svg;

    // Treat as URL. Relative URLs should point into /public (e.g. /assets/marker.svg)
    const res = await fetch(svg);
    return await res.text();
  };

  const addSvgMarkerImage = async (mapInstance, { svg, fillColor, strokeColor, strokeWidth, useOriginalColors, imageId }) => {
    if (!mapInstance || !svg || !imageId) return;
    if (mapInstance.hasImage(imageId)) return;
    if (markerImageCacheRef.current.has(imageId)) return;

    const raw = await fetchSvgText(svg);
    if (!raw) return;

    const colored = buildStyledSvg(raw, { fillColor, strokeColor, strokeWidth, useOriginalColors });
    if (!colored) return;

    // Convert SVG string -> Image -> Mapbox image
    const blob = new Blob([colored], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          mapInstance.addImage(imageId, img, { pixelRatio: 2 });
          markerImageCacheRef.current.add(imageId);
        } catch (e) {
          // addImage can throw if style isn't ready; keep it silent.
          // The layer effect below will retry on next action/styledata.
        }
        URL.revokeObjectURL(url);
        resolve();
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve();
      };
      img.src = url;
    });
  };

  // Use the first chapter that actually has a location (so PlainText can be first)
  const firstChapterWithLocation = chapters.find(
    (c) =>
      c &&
      c.location &&
      Array.isArray(c.location.center) &&
      c.location.center.length === 2
  );

  const initialLocation = firstChapterWithLocation?.location ?? {
    center: [0, 0],
    zoom: 1,
    pitch: 0,
    bearing: 0
  };

  const [initialLongitude, initialLatitude] = initialLocation.center;

  const [markerPosition, setMarkerPosition] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude
  });
  const initialViewport = {
    initialViewState: {
      latitude: initialLatitude,
      longitude: initialLongitude,
      pitch: initialLocation.pitch,
      bearing: initialLocation.bearing,
      zoom: initialLocation.zoom
    }
  };
  const [viewport, setViewport] = useState(initialViewport);
  const updateViewport = (newViewport) =>
    setViewport({ ...viewport, ...newViewport });

  useHandleResize(updateViewport);

  // Set map when loaded
useEffect(() => {
  if (!loaded || !mapRef.current) return undefined;

  const m = mapRef.current.getMap();
  setMap(m);

  // Expose the live Mapbox map instance globally so other components (e.g. legend)
  // can read current paint properties from layers.
  //
  // Keep this name stable: chapter.js uses window.__MAP__.
  if (typeof window !== 'undefined') {
    window.__MAP__ = m;

    // If the style reloads (setStyle), keep the reference available.
    m.on('styledata', () => {
      window.__MAP__ = m;
    });
  }

  return undefined;
}, [mapRef, loaded, setMap]);

// 1) Animated track setup (source + layer)
useEffect(() => {
  if (!loaded || !map) return;

  const SOURCE_ID = "icon-anim";
  const LAYER_ID = "icon-anim-line";

  const DOT_SOURCE_ID = "icon-dot";
  const DOT_LAYER_ID = "icon-dot-layer";


  const ensureAnimLayer = () => {
    // source
    if (!map.getSource(SOURCE_ID)) {
  map.addSource(SOURCE_ID, {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] }
  });
}

    // layer
    if (!map.getLayer(LAYER_ID)) {
      map.addLayer({
        id: LAYER_ID,
        type: "line",
        source: SOURCE_ID,
        paint: {
          "line-color": "#e46d6e",  
          "line-width": 2,
          "line-opacity": 0.9
        }
      });
    }
    
// dot source
if (!map.getSource(DOT_SOURCE_ID)) {
  map.addSource(DOT_SOURCE_ID, {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: { type: "Point", coordinates: [] }
    }
  });
}

// dot layer is created in a separate effect so it can switch between
// circle and SVG symbol based on config (currentAction.marker).
    
    
  };

  ensureAnimLayer();

  // Re-add after any style reload
  map.on("styledata", ensureAnimLayer);
  return () => map.off("styledata", ensureAnimLayer);
}, [loaded, map]);


// 1b) Animated track "head" marker styling (circle OR SVG)
useEffect(() => {
  if (!loaded || !map) return;

  const DOT_SOURCE_ID = "icon-dot";
  const DOT_LAYER_ID = "icon-dot-layer";

  const applyMarkerStyle = async () => {
    const style = getMarkerStyleFromAction(currentAction);

    // Ensure dot source exists (created in the other effect, but style reloads can reset).
    if (!map.getSource(DOT_SOURCE_ID)) {
      map.addSource(DOT_SOURCE_ID, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "Point", coordinates: [] }
        }
      });
    }

    // If the existing layer type doesn't match what we need, remove it.
    const existing = map.getLayer(DOT_LAYER_ID);
    if (existing) {
      const wantsCircle = style.type === 'circle' || !style.svg;
      const isCircle = existing.type === 'circle';
      const isSymbol = existing.type === 'symbol';
      if ((wantsCircle && !isCircle) || (!wantsCircle && !isSymbol)) {
        map.removeLayer(DOT_LAYER_ID);
      }
    }

    const wantsCircle = style.type === 'circle' || !style.svg;
    if (wantsCircle) {
      if (!map.getLayer(DOT_LAYER_ID)) {
        map.addLayer({
          id: DOT_LAYER_ID,
          type: "circle",
          source: DOT_SOURCE_ID,
          paint: {
            "circle-radius": style.circleRadius,
            "circle-color": style.color,
            "circle-stroke-width": style.circleStrokeWidth,
            "circle-stroke-color": style.circleStrokeColor
          }
        });
      } else {
        // Update styling live
        map.setPaintProperty(DOT_LAYER_ID, "circle-radius", style.circleRadius);
        map.setPaintProperty(DOT_LAYER_ID, "circle-color", style.color);
        map.setPaintProperty(DOT_LAYER_ID, "circle-stroke-width", style.circleStrokeWidth);
        map.setPaintProperty(DOT_LAYER_ID, "circle-stroke-color", style.circleStrokeColor);
      }
      return;
    }

    // SVG marker (symbol layer)
    // Create a stable image id per SVG+color so different chapters can use different colors.
    const colorForSvg = style.useOriginalColors ? null : style.color;
    const svgKey = `${style.svg}::${colorForSvg || 'original'}::${style.borderColor || 'none'}::${style.borderWidth || 0}::${style.useOriginalColors ? 'orig' : 'flat'}`;
    const imageId = `icon-marker-svg-${btoa(unescape(encodeURIComponent(svgKey))).replace(/=+/g, '')}`;

    await addSvgMarkerImage(map, {
      svg: style.svg,
      fillColor: colorForSvg,
      strokeColor: style.borderColor,
      strokeWidth: style.borderWidth,
      useOriginalColors: style.useOriginalColors,
      imageId
    });

    if (!map.getLayer(DOT_LAYER_ID)) {
      map.addLayer({
        id: DOT_LAYER_ID,
        type: "symbol",
        source: DOT_SOURCE_ID,
        layout: {
          "icon-image": imageId,
          "icon-size": style.size,
          "icon-rotate": style.rotate,
          "icon-rotation-alignment": "map",
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
          "icon-anchor": "center"
        }
      });
    } else {
      map.setLayoutProperty(DOT_LAYER_ID, "icon-image", imageId);
      map.setLayoutProperty(DOT_LAYER_ID, "icon-size", style.size);
      map.setLayoutProperty(DOT_LAYER_ID, "icon-rotate", style.rotate);
    }
  };

  applyMarkerStyle();

  // Re-apply after any style reload
  map.on("styledata", applyMarkerStyle);
  return () => map.off("styledata", applyMarkerStyle);
}, [loaded, map, currentAction]);





// 2) Animated track controller (plays ALL parts, antimeridian-safe, pause/resume)
useEffect(() => {
  if (!loaded || !map) return;

  const SOURCE_ID = "icon-anim";
  const DOT_SOURCE_ID = "icon-dot";


  let parts = [];            // array of coordinate arrays (each "part" is a LineString)
  let animId = null;

  // animation state
  let partIdx = 0;           // which part we’re drawing
  let pointIdx = 0;          // how many points into the current part
  let isPaused = false;

  // “session” state
  let currentTrackFile = null;
  let speed = 2;

  
  const setFeatures = (features) => {
  const src = map.getSource(SOURCE_ID);
  if (!src) return;

  src.setData({
    type: "FeatureCollection",
    features
  });
};

const setDot = (coord) => {
  const src = map.getSource(DOT_SOURCE_ID);
  if (!src) return;

  src.setData({
    type: "Feature",
    properties: {},
    geometry: { type: "Point", coordinates: coord }
  });
};

  

  const buildDrawnFeatures = () => {
    const features = [];

    // fully completed parts
    for (let i = 0; i < partIdx; i++) {
      features.push({
        type: "Feature",
        properties: { part: i + 1, status: "done" },
        geometry: { type: "LineString", coordinates: parts[i] }
      });
    }

    // current part (partial)
    const current = parts[partIdx];
    if (current) {
      const slice = current.slice(0, Math.max(2, pointIdx));
      if (slice.length >= 2) {
        features.push({
          type: "Feature",
          properties: { part: partIdx + 1, status: "active" },
          geometry: { type: "LineString", coordinates: slice }
        });
      }
    }

    return features;
  };

  const loadTrack = async (trackFile) => {
    const res = await fetch(trackFile);
    const gj = await res.json();

    const feats = gj?.features || [];
    const lineFeats = feats.filter((f) => f?.geometry?.type === "LineString");

    parts = lineFeats
      .map((f) => f.geometry.coordinates || [])
      .filter((c) => Array.isArray(c) && c.length >= 2);

    return parts;
  };

  const reset = () => {
    if (animId) cancelAnimationFrame(animId);
    animId = null;

    partIdx = 0;
    pointIdx = 0;
    isPaused = false;

    // keep currentTrackFile so you can decide whether to restart or not
    setFeatures([]); // clear drawn line
    setDot([]);

  };

  const pause = () => {
    isPaused = true;
    if (animId) cancelAnimationFrame(animId);
    animId = null;
  };

  const tick = () => {
    if (isPaused) return;

    const current = parts[partIdx];
    if (!current) return;

    // advance within current part
    pointIdx = Math.min(pointIdx + speed, current.length);

    // render
    setFeatures(buildDrawnFeatures());
    
    const headIndex = Math.max(0, Math.min(pointIdx - 1, current.length - 1));
setDot(current[headIndex]);


    // if current part finished -> next
    if (pointIdx >= current.length) {
      partIdx += 1;
      pointIdx = 0;

      // all parts done
      if (partIdx >= parts.length) {
        animId = null;
        return;
      }
    }

    animId = requestAnimationFrame(tick);
  };

  const resume = () => {
    if (!parts.length) return;
    if (animId) cancelAnimationFrame(animId);
    isPaused = false;
    animId = requestAnimationFrame(tick);
  };

  // start = load (if needed) + (optionally) restart + play
const getBoundsFromParts = () => {
  let minLon = Infinity, minLat = Infinity, maxLon = -Infinity, maxLat = -Infinity;

  for (const part of parts) {
    for (const [lon, lat] of part) {
      if (lon < minLon) minLon = lon;
      if (lat < minLat) minLat = lat;
      if (lon > maxLon) maxLon = lon;
      if (lat > maxLat) maxLat = lat;
    }
  }

  if (!isFinite(minLon) || !isFinite(minLat) || !isFinite(maxLon) || !isFinite(maxLat)) return null;
  return [[minLon, minLat], [maxLon, maxLat]];
};
  
// trackAnimation.start(options)
//
// Options you can set from config.js:
//   trackFile: "/data/tracks/YourFile.geojson"  (required)
//   speed: Number
//     - how fast the animation advances per frame (higher = faster).
//   camera: "chapter" | "static" | "start" | "fit"
//     - "chapter": let the chapter location control the camera (default).
//     - "static":  do not move the camera at all.
//     - "start":   fly to the first coordinate of the track before drawing.
//     - "fit":     fitBounds to the whole track before drawing.
//   cameraPadding: Number
//     - padding (px) used by camera:"fit".
//   flyToStart: boolean (optional)
//     - manual override for the "start" behavior.
//   restart: boolean
//     - force reloading and restart the animation from the beginning.
const start = async ({
  trackFile,
  speed: sp = 2,
  camera = "chapter",       // "chapter" | "static" | "start" | "fit"
  cameraPadding = 80,       // used by "fit"
  flyToStart,               // optional override; if omitted we infer from camera
  restart = false,
  marker
} = {}) => {

    if (!trackFile) {
      console.warn("trackAnimation.start: missing trackFile");
      return;
    }
    // Remember last marker settings so the dot layer can switch to SVG immediately.
    if (typeof window !== "undefined") {
      window.__TRACK_MARKER__ = marker || null;
    }


    // same icon + not restarting: just resume where we left off
    if (currentTrackFile === trackFile && parts.length && !restart) {
      speed = sp;
      resume();
      return;
    }

    // new icon OR forced restart
    currentTrackFile = trackFile;
    speed = sp;
    isPaused = false;

    await loadTrack(trackFile);
    if (!parts.length) return;

    // reset progress only when starting new icon or forced restart
    if (animId) cancelAnimationFrame(animId);
    animId = null;
    partIdx = 0;
    pointIdx = 0;

    setFeatures([]); // clear before re-drawing

const shouldFlyToStart =
  typeof flyToStart === "boolean"
    ? flyToStart
    : camera === "start"; // default behavior based on camera mode

if (camera === "fit") {
  const bounds = getBoundsFromParts();
  if (bounds) {
    map.fitBounds(bounds, {
      padding: cameraPadding,
      bearing: map.getBearing(),
      pitch: map.getPitch(),
      duration: 1200
    });
  }
} else if (shouldFlyToStart) {
  const [lon, lat] = parts[0][0];
  map.flyTo({
    center: [lon, lat],
    zoom: map.getZoom(),
    bearing: map.getBearing(),
    pitch: map.getPitch(),
    duration: 1200
  });
} else {
  // "chapter" and "static" do nothing here:
  // - "chapter": let scrolly's chapter location control the camera
  // - "static": keep whatever camera you already have
}


    animId = requestAnimationFrame(tick);
  };

  // expose global API for scrolly triggers
  window.trackAnimation = { start, pause, resume, reset };

  return () => {
    // cleanup if component unmounts
    if (animId) cancelAnimationFrame(animId);
    if (window.trackAnimation) delete window.trackAnimation;
  };
}, [loaded, map]);





  useScrollFunctionality({
    loaded,
    map,
    chapters,
    showMarkers,
    setCurrentChapter,
    setMarkerPosition,
    setExternalLayersOpacity,
    externalLayersOpacity,
    externalLayers,
    currentAction,
    currentChapterId
  });
  return (
    <div ref={mapContainerRef} className="mapboxgl-map">
      <ReactMapGL
        ref={mapRef}
        width="100%"
        height="100%"
        mapboxApiAccessToken={accessToken}
        mapStyle={mapStyle}
        transformRequest={transformRequest}
        onLoad={() => setLoaded(true)}
        onViewportChange={updateViewport}
        onResize={updateViewport}
        scrollZoom={false}
        dragPan={false}
        dragRotate={false}
        doubleClickZoom={false}
        {...viewport}
      >
        {showMarkers && (
          <Marker
            longitude={markerPosition.longitude}
            latitude={markerPosition.latitude}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default Map;