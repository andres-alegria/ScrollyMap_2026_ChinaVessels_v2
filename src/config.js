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
  footer: 'Text by Elizabeth Alberts | Graphics by Andrés Alegría',
 
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

  // Chapter 0: Plain Text

  // Chapter 1: September 2025

  // Chapter 2: Video Footage

  // Chapter 3: October 2025

  // Chapter 4: November 2025

  // Chapter 5: December 2025



/////////////////////////////////////////////////////////////

// Plain Text

//  html:
//  <h2>Placeholder heading</h2>
//  <p>
//  <strong>Placeholder bold</strong> — Placeholder regular text…
//  <em>Placeholder italic</em>, Placeholder regular text…
//  </p> 

{
  id: "Chapter 0",
  type: "stage",
  stage: "PlainText",
  title: "",
  
  html:
`  
  <p>
To understand how a Chinese research vessel might be used for both civilian and military roles, consider the paths taken within the last six months by a vessel known as the <strong>Hai Yang Di Zhi Liu Hao</strong>.
  </p>
`
},

  // Chapter 1: September 2025
{
  id: "Chapter 1",
  alignment: 'left',

  title: 'September 2025',
  description: "The Hai Yang Di Zhi Liu Hao ventured out towards the COMRA’s ISA-approved area in the Northwest Pacific. According to the Guangzhou Marine Geological Survey, a research institution of the China Geological Survey, funded by the government, the vessel was on a 95-day research expedition, which ended Dec. 2, 2025.",

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




  ],
};
