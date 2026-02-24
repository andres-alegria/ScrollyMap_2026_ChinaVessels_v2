const { REACT_APP_MAPBOX_ACCESS_TOKEN } = process.env;

export default {
  style: 'mapbox://styles/mongabay/cmktmslps004z01se8n68atf5',
 
  accessToken: REACT_APP_MAPBOX_ACCESS_TOKEN,
 
  theme: 'mongabay',

  intro: {
    title: 'Deep sea mining',
    subtitle: "Tracking china vessels.",
    date: 'February 16, 2026',

   social: [
      {
        name: 'X',
        src: 'x.svg',
        href: 'https://x.com/mongabay',
      },
      {
        name: 'facebook',
        src: 'facebook.svg',
        href: 'https://www.facebook.com/mongabay/',
      },
    ],
  },
  logos: [
    {
      name: 'mongabay',
      src: 'mongabaylogo.png',
      width: '140',
      href: 'https://news.mongabay.com',
    },
  ],
  alignment: 'left',
  footer: 'Text by Elizabeth Alberts | Visualization by Andrés Alegría',
 
  // Chapter camera behavior
  //
  // Per chapter you can set:
  //   mapAnimation: 'flyTo' | 'easeTo' | 'jumpTo'
  //
  // The camera method is applied to the chapter.location object.
  // If omitted, it defaults to 'flyTo'.
  //
  // Track animation note:
  // If you use onChapterEnter -> { callback: 'trackAnimation.start', options: { camera: ... } }
  // and camera is NOT 'chapter', the chapter system will *not* move the camera (to avoid conflicts).

  chapters: [

// Visual04: Types of deep-sea mineral deposits

// Visual05: Environmental consequences

// Visual06: Overall activity/additional missions of the vessels

// Visual07: Pathway of the Haiyang Dizhi Liuhao 

// Visual08: Pathway of the Xiang Yang Hong 6

// Visual09: Pathway of other vessels

// Visual11: BOEM


/////////////////////////////////////////////////////////////

// Plain Text

//  html:
//  <h2>Placeholder heading</h2>
//  <p>
//  <strong>Placeholder bold</strong> — Placeholder regular text…
//  <em>Placeholder italic</em>, Placeholder regular text…
//  </p> 

{
  id: "PlainText01",
  type: "stage",
  stage: "PlainText",
  title: "",
  
  html:
`  
  <p>
    In June 2025, the Xiang Yang Hang 01, a chalky white vessel loaded with oceanographic equipment, 
    cruised through the Northwest Pacific until it reached a section of the seafloor rich in polymetallic nodules 
    — potato-shaped rocks that contain commercially valuable metals such as manganese, nickel, cobalt, and copper. 
    The ship crisscrossed and zigzagged over the site, conducting research in the area miners would eventually 
    exploit through deep-sea mining — a controversial industry that could be on the cusp of starting, and that 
    experts warn could cause irreparable harm to marine ecosystems. 
  </p>
`
},

// Visual01: Pathway of the Xiang Yang Hang 01
{
  id: "Visual01",
  alignment: 'left',

  title: 'Visual01',
  description: "Pathway of the Xiang Yang Hang 01.",

  location: { center: [150.0, 17.15], zoom: 3.25, pitch: 0, bearing: 0 },
  
  legend: [
        {
          title: 'Exploration Areas',
          color: '#e66d6d',
          border: '#f6bcb3',
        },
        {
          title: 'Reserve Areas',
          color: '#006a54',
        },
         ],
  
  onChapterEnter: [
    {
      callback: "trackAnimation.start",
      options: {
      vesselFile: "/data/tracks/Xiang_Yang_Hong01_track_June2025.geojson", 
      speed: 5,
      }
    }
  ],
  onChapterExit: [
    { callback: "trackAnimation.resume" },
  ]
},


// Plain Text

//  html:
//   <h3><strong>Placeholder heading</strong></h3>
//  <p>
//   <strong>Placeholder bold</strong> — Placeholder regular text…
//  <em>Placeholder italic</em>, Placeholder regular text…
//  </p> 

{
  id: "PlainText02",
  type: "stage",
  stage: "PlainText",
  title: "",
  
  html:
`  
  <p>
    Since entering service in 2016, the Xiang Yan Hang 01, a Chinese state-owned and 
    operated deep-sea research vessel, has gone on several deep-sea mining research expeditions, 
    mainly in the Northwest Pacific, including the visit in June 2025. Yet, over the past five years, 
    the vessel has spent far more time outside designated deep-sea mining exploration areas, and has 
    logged extensive trips in strategic waterways from the South China Sea and Guam to the Indian Ocean 
    and the Russian Arctic — regions that naval, civil and academic experts that Mongabay and CNN 
    spoke with say could prove critical in any future maritime conflict with the United States. 
    These missions point towards the vessel’s dual-use nature and China’s pursuit of “maritime power” 
    — a goal that Chinese President Xi Jinping first articulated in 2012, shortly after taking office, 
    and has reiterated over the years. Within this broader objective, some analysts argue that China 
    views the deep seabed, and the exploitation of its minerals, as its next frontier.
    </p>
    <p>
    Alexander Gray, a security expert who previously served as the deputy assistant to the president 
    and chief of staff of the White House National Security Council during the first Trump administration, 
    told Mongabay and CNN that the U.S. government, particularly under Trump, has held “a very real concern” 
    about the dual uses of China’s research vessels. He said there are separate concerns about China’s 
    attempt to monopolize critical minerals, which he said likely drove the U.S. to pursue deep-sea mining.
    </p>
    <p>
    “China [is] using critical minerals as a tool of economic coercion against the United States,” 
    Gray said. “To the extent that we can diversify supply through deep-sea mining that adds some 
    significant resilience and redundancy to our ability to withstand those shocks. And that, I think, 
    very much justifies this speeding forward on this development.”
    </p>
    <p>
    Indeed, the U.S. is ramping up its efforts to enter the deep-sea mining sphere, with a stated 
    goal of countering China’s dominance in the sector. However, critics of the industry, which 
    includes government officials, scientists, and environmentalists — warn that the marine 
    environment could be the loser in this race to the bottom of the seabed.
  </p>
  
   <h3><strong>China’s growing influence in the ocean</strong></h3>
   <p>
   Mongabay and CNN, with the support of the Pulitzer Center, tracked eight state-owned Chinese vessels that have undertaken deep sea mining exploratory missions or research in designated areas.
    </p>
`
},

// Visual02: Eight vessels


{
  id: "Visual02",
  type: "stage",
  stage: "GalleryHorizontalScroll",
},

// Visual03: ISA contract areas

  {
      id: 'Visual03',
      alignment: 'left',
      hidden: false,
      title: 'Visual03',
      description: "ISA contract areas.",
       
      location: {
        center: [-135.0, 12.0],
        zoom: 3.25,
        pitch: 10,
        bearing: 0,
      },

      mapAnimation: 'flyTo',

legend: [
        {
          title: 'Exploration Areas',
          color: '#e66d6d',
          border: '#f6bcb3',
        },
        {
          title: 'Reserve Areas',
          color: '#006a54',
        },
         ],
      
      onChapterEnter: [      ],
      onChapterExit: [      ],
    },



// Visual10: Pathways around the Cook Islands

// Visual10a: Nautilus

{
  id: "Visual10a",
  alignment: 'right',

  title: 'Visual10a',
  description: "Pathways around the Cook Islands. Nautilus",

  location: { center: [-158.067, -18.252], zoom: 4.2, pitch: 0, bearing: 0 },
  
  onChapterEnter: [
    {
      callback: "trackAnimation.start",
      options: {
      vesselFile: "/data/tracks/EVNautilus.geojson", 
      speed: 75,
      flyToStart: false,
      }
    }
    
  ],
  onChapterExit: [
    { callback: "trackAnimation.resume" },
  ]
},

// Visual10b: Da Yang Hao

{
  id: "Visual10b",
  alignment: 'right',

  title: 'Visual10b',
  description: "Pathways around the Cook Islands. Da Yang Hao",

  location: { center: [-158.067, -18.252], zoom: 4.2, pitch: 0, bearing: 0 },
  
  onChapterEnter: [
    {
      callback: "trackAnimation.start",
      options: {
      vesselFile: "/data/tracks/Da_Yang_Hao_track_Cook_Isl.geojson", 
      speed: 1,
      flyToStart: false,
      }
    }
    
  ],
  onChapterExit: [
    { callback: "trackAnimation.resume" },
  ]
},


// TEST

{
  id: "VisualFlip01",
  type: "stage",
  stage: "GalleryFlipImage",

  // Optional: card sizing (when you have many items and horizontal scroll is enabled)
  // cardWidth: 420,

  // Optional: if you only have a few items, stretch them to fill the full width
  fillWidthWhenFew: true,
  fillWidthMaxItems: 3,

  // All content defined here:
  items: [
    {
      title: "Polymetallic nodules",
      body: "Potato-sized rocks rich in manganese, nickel copper, and cobalt are found in the sediment of flat abyssal plains, typically at depths of 4,000 to 6,000 meters. Nodules take tens of millions of years to form, accumulating metals layer by layer around a core like a shark's tooth or shell fragment. Nodules are particularly abundant in the CCZ, although they are found in many parts of the ocean.",
      image: "https://imgs.mongabay.com/wp-content/uploads/sites/20/2025/07/21094621/TMC_PMN.jpg",
    },
    {
      title: "Polymetallic sulfides",
      body: "Deposits rich in copper, zinc, gold and silver that form around hydrothermal vents — underwater volcanic openings that release mineral-rich fluids —  along mid-ocean ridges at depths of about 2,000 meters (6,600 feet).",
      image: "https://imgs.mongabay.com/wp-content/uploads/sites/20/2025/07/21094626/TMC_PMS.jpg"
    },
    {
      title: "Ferromanganese crusts",
      body: "Ferromanganese crusts grow along the surfaces of seamounts, ridges and plateaus, typically at depths of 400-5,000 meters (1,300-16,400 feet). They contain high concentrations of cobalt, along with manganese, nickel, platinum and rare earth elements. ",
      image: "https://imgs.mongabay.com/wp-content/uploads/sites/20/2025/07/21094618/TMC_CRF.jpg"
    }    
  ]
}





  ],
};
