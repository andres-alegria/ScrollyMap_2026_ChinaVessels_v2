const { REACT_APP_MAPBOX_ACCESS_TOKEN } = process.env;

export default {
  style: 'mapbox://styles/mongabay/cmktmslps004z01se8n68atf5',
 
  accessToken: REACT_APP_MAPBOX_ACCESS_TOKEN,
 
  theme: 'mongabay',

  intro: {
    title: 'Deep sea mining',
    subtitle: "To understand how a Chinese research vessel might be used for both civilian and military roles, consider the paths taken within the last six months by a vessel known as the Hai Yang Di Zhi Liu Hao.",
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


/////////////////////////////////////////////////////////////

// Plain Text

// {
//   id: "Chapter 0",
//   type: "stage",
//   stage: "PlainText",
//   title: "",
//   
//   html:
// `  
//   <p>
// To understand how a Chinese research vessel might be used for both civilian and military roles, consider the paths taken within the last six months by a vessel known as the <strong>Hai Yang Di Zhi Liu Hao</strong>.
//   </p>
// `
// },

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

  // Chapter 2: Video Footage
  {
      id: 'chapter 2',
      alignment: 'left',
      hidden: false,
      title: 'Video Footage',
      description: "The ship appeared to survey a stretch of ocean just outside of the COMRA license area. Media accounts reported that researchers collected data, samples of seabed sediment and nodules, as well as deep-sea organisms and seawater. Footage from the expedition shows vast swathes of polymetallic nodules. The China Geological Survey did not respond to Mongabay’s request for more information.</b>",
       
      location: {
        center: [-80.5, -20.5],
        zoom: 5.25,
        pitch: 0,
        bearing: 0,
      },
      
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      onChapterEnter: [      ],
      onChapterExit: [      ],
    },

  // Chapter 3: October 2025
  {
      id: 'chapter 3',
      alignment: 'left',
      hidden: false,
      title: 'October 2025',
      description: "<p>In October — while the expedition was still reportedly taking place — the vessel traveled west through the Northern Mariana Islands, a U.S. commonwealth that serves as a vital military hub, before zigzagging up and down the border of its exclusive economic zone (EEZ) as well as just outside the EEZ of neighboring Guam, another U.S. territory.</p> <br> <p>Tom Shugart, a former U.S. Navy submarine warfare officer and expert in undersea warfare with a focus on the Indo-Pacific region, told Mongabay and CNN that he believed the vessel could have motives beyond deep-sea research.</p>",
       
      location: {
        center: [-80.5, -20.5],
        zoom: 5.25,
        pitch: 0,
        bearing: 0,
      },
      
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      onChapterEnter: [      ],
      onChapterExit: [      ],
    },
    
// Plain Text

{
 id: "Chapter 0",
 type: "stage",
 stage: "PlainText",
 title: "",

 html:
`   <p>
“That’s on the route that U.S. submarines might transit from Guam to places West,” said
Shugart. He said he believed it was possible that the vessel could be leaving behind sensors at 4,600 meters below the ocean’s surface to record a submarine’s unique sound signature — the noise and vibrations a vessel makes in the water when it moves past. 
</p>
<p>
“The sound signature of our submarines is a very, very valuable piece of information for them to get, so they know what they're looking for, what they're hunting for,” Shugart said. “Because if you don’t know what those frequencies are, then it's very difficult to pick a submarine out of a needle in the haystack -- out of all the other noise that’s in the ocean.”
 </p> `
},  

  // Chapter 4: November 2025
  {
      id: 'chapter 4',
      alignment: 'left',
      hidden: false,
      title: 'November 2025',
      description: "xxx.</b>",
       
      location: {
        center: [-80.5, -20.5],
        zoom: 5.25,
        pitch: 0,
        bearing: 0,
      },
      
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      onChapterEnter: [      ],
      onChapterExit: [      ],
    },
    
  // Chapter 5: December 2025
  {
      id: 'chapter 3',
      alignment: 'left',
      hidden: false,
      title: 'December 2025',
      description: "xxx.</b>",
       
      location: {
        center: [-80.5, -20.5],
        zoom: 3.25,
        pitch: 0,
        bearing: 0,
      },
      
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      onChapterEnter: [      ],
      onChapterExit: [      ],
    },

  ],
};
