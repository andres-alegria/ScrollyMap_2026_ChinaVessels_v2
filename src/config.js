const { REACT_APP_MAPBOX_ACCESS_TOKEN } = process.env;

export default {
  style: 'mapbox://styles/mongabay/cmktmslps004z01se8n68atf5',
 
  accessToken: REACT_APP_MAPBOX_ACCESS_TOKEN,
 
  theme: 'mongabay',

  intro: {
    title: 'Dual-purpose',
    subtitle: "To understand how a Chinese research vessel might be used for both civilian and military roles, consider the paths taken within the last six months by a vessel known as the Hai Yang Di Zhi Liu Hao.",
    date: 'March 3, 2026',

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
  id: "chapter 1",
  alignment: 'left',

  title: 'September 2025',
  description: "The Hai Yang Di Zhi Liu Hao ventured out towards the COMRA’s ISA-approved area in the Northwest Pacific. According to the Guangzhou Marine Geological Survey, a research institution of the China Geological Survey, funded by the government, the vessel was on a 95-day research expedition, which ended Dec. 2, 2025.",

  location: { center: [130.0, 15.0], zoom: 3.0, pitch: 0, bearing: 0 },
  
  legend: [
             {
          title: 'ISA Exploration Areas',
          color: '#e66d6d',
          border: '#ffffff',
        },
        {
          title: 'ISA Reserve Areas',
          color: '#f3e677',
          border: '#ffffff',
        },
                {
          title: 'Exclusive Economic Zones (EZZs)',
          color: '#005b67',
          border: '#ffffff',
        },
                        {
          title: 'Deep-sea mineral areas',
          color: '#000000',
          pattern: 'Hash',
        },
         ],
  
  onChapterEnter: [
    {
      callback: "trackAnimation.start",
      options: {
      vesselFile: "/data/tracks/Haiyang_Dizhi_Liuhao_track_1Sept.geojson",
      speed: 5,
      }
    },
       {
         
      layer: 'Haiyangdizhiliuhao4Dec',
      opacity: 0,
    },
         {
         
      layer: 'Haiyangdizhiliuhao3Nov',
      opacity: 0,
    },
       {
         
      layer: 'Haiyangdizhiliuhao2Oct',
      opacity: 0,
    },
       {
         
      layer: 'Haiyangdizhiliuhao1Sep',
      opacity: 0,
    }
  ],
  onChapterExit: [
    { callback: "trackAnimation.resume" },
  ]
},

  // Chapter 2: Video Footage
  {
  id: 'chapter 2',
  type: 'stage',
  stage: 'PlainText',
  alignment: 'left',
  title: '',

  location: { center: [130.0, 15.0], zoom: 3.0, pitch: 0, bearing: 0 },

legend: [
             {
          title: 'ISA Exploration Areas',
          color: '#e66d6d',
          border: '#ffffff',
        },
        {
          title: 'ISA Reserve Areas',
          color: '#f3e677',
          border: '#ffffff',
        },
                {
          title: 'Exclusive Economic Zones (EZZs)',
          color: '#005b67',
          border: '#ffffff',
        },
                        {
          title: 'Deep-sea mineral areas',
          color: '#000000',
          pattern: 'Hash',
        },
         ],
         
  mapAnimation: 'flyTo',
  rotateAnimation: false,

  html: `
    <p>
      The ship appeared to survey a stretch of ocean just outside of the COMRA license area. Media accounts reported that researchers collected data, samples of seabed sediment and nodules, as well as deep-sea organisms and seawater. Footage from the expedition shows vast swathes of polymetallic nodules. The China Geological Survey did not respond to Mongabay’s request for more information.
    </p>

    <div style="position:relative; padding-top:56.25%; height:0; overflow:hidden; border-radius:12px;">
      <iframe
  src="https://www.youtube.com/embed/wi6Qs6LkJdU?si=WpeJd1R7kkFSIkvP?controls=0&rel=0&iv_load_policy=3"
  title="Polymetallic nodules"
  style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
    </div>
  `,

  onChapterEnter: [],
  onChapterExit: [],
},

  // Chapter 3: October 2025
  {
      id: 'chapter 3',
      alignment: 'left',
      hidden: false,
      title: 'October 2025',
      description: "<p>In October — while the expedition was still reportedly taking place — the vessel traveled west through the Northern Mariana Islands, a U.S. commonwealth that serves as a vital military hub, before zigzagging up and down the border of its exclusive economic zone (EEZ) as well as just outside the EEZ of neighboring Guam, another U.S. territory.</p> <br> <p>Tom Shugart, a former U.S. Navy submarine warfare officer and expert in undersea warfare with a focus on the Indo-Pacific region, told Mongabay and CNN that he believed the vessel could have motives beyond deep-sea research.</p>",
       
      location: { center: [130.0, 15.0], zoom: 3.0, pitch: 0, bearing: 0 },

legend: [
             {
          title: 'ISA Exploration Areas',
          color: '#e66d6d',
          border: '#ffffff',
        },
        {
          title: 'ISA Reserve Areas',
          color: '#f3e677',
          border: '#ffffff',
        },
                {
          title: 'Exclusive Economic Zones (EZZs)',
          color: '#005b67',
          border: '#ffffff',
        },
                        {
          title: 'Deep-sea mineral areas',
          color: '#000000',
          pattern: 'Hash',
        },
         ],
      
      mapAnimation: 'flyTo',
      rotateAnimation: false,

  onChapterEnter: [
    {
      callback: "trackAnimation.start",
      options: {
      vesselFile: "/data/tracks/Haiyang_Dizhi_Liuhao_track_2Oct.geojson",
      speed: 5,
      }
    },
       {
         
      layer: 'Haiyangdizhiliuhao4Dec',
      opacity: 0,
    },
         {
         
      layer: 'Haiyangdizhiliuhao3Nov',
      opacity: 0,
    },
       {
         
      layer: 'Haiyangdizhiliuhao2Oct',
      opacity: 0,
    },
       {
         
      layer: 'Haiyangdizhiliuhao1Sep',
      opacity: 1,
    }
  ],
  onChapterExit: [
    { callback: "trackAnimation.resume" },
  ]
    },
    
// Plain Text a

{
 id: "plain text a",
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
      description: "<p>A month later, while the Hai Yang Di Zhi Liu Hao was still reportedly on its research expedition, it  journeyed into the EEZ of the Federated States of Micronesia (FSM), a U.S.-allied island nation that has previously called for a moratorium on deep-sea mining. FSM includes the state of Yap, where the U.S. Air Force is investing $400 million to extend the island’s international airport runway to support American military operations. Guam and Micronesia are considered part of the “Second Island Chain,” a US line of defense against potential Chinese military aggression and a critical component of US Indo-Pacific strategy under Trump.</p><br><p>The Micronesian government did not respond to Mongabay and CNN’s questions about whether it had given China permission to conduct deep-sea research in its EEZ.",
       
      location: { center: [130.0, 15.0], zoom: 3.0, pitch: 0, bearing: 0 },

      
      mapAnimation: 'flyTo',
      rotateAnimation: false,


  onChapterEnter: [
    {
      callback: "trackAnimation.start",
      options: {
      vesselFile: "/data/tracks/Haiyang_Dizhi_Liuhao_track_3Nov.geojson",
      speed: 5,
      }
    },
       {
         
      layer: 'Haiyangdizhiliuhao4Dec',
      opacity: 0,
    },
         {
         
      layer: 'Haiyangdizhiliuhao3Nov',
      opacity: 0,
    },
       {
         
      layer: 'Haiyangdizhiliuhao2Oct',
      opacity: 1,
    },
       {
         
      layer: 'Haiyangdizhiliuhao1Sep',
      opacity: 1,
    }
  ],
  onChapterExit: [
    { callback: "trackAnimation.resume" },
  ]
    },
    
  // Chapter 5: December 2025
  {
      id: 'chapter 5',
      alignment: 'left',
      hidden: false,
      title: 'December 2025',
      description: "The Hai Yang Di Zhi Liu Hao then cruised through the Philippine Sea before sweeping north of Taiwan. On Dec. 13,  it docked in Sanya, a strategic maritime gateway and home to Chinese nuclear submarines.<b>",
       
      location: { center: [111.0, 20.0], zoom: 4.75, pitch: 0, bearing: 0 },
      
      mapAnimation: 'flyTo',
      rotateAnimation: false,


  onChapterEnter: [
    {
      callback: "trackAnimation.start",
      options: {
      vesselFile: "/data/tracks/Haiyang_Dizhi_Liuhao_track_4Dec.geojson",
      speed: 5,
      }
    },
       {
         
      layer: 'Haiyangdizhiliuhao4Dec',
      opacity: 0,
    },
         {
         
      layer: 'Haiyangdizhiliuhao3Nov',
      opacity: 1,
    },
       {
         
      layer: 'Haiyangdizhiliuhao2Oct',
      opacity: 1,
    },
       {
         
      layer: 'Haiyangdizhiliuhao1Sep',
      opacity: 1,
    }
  ],
  onChapterExit: [
    { callback: "trackAnimation.resume" },
  ]
    },
    
// Plain Text b

{
 id: "plain text b",
 type: "stage",
 stage: "PlainText",
 title: "",

 html:
`   <p>
James Fanell, the former director of intelligence and information operations for the Pacific Fleet for the U.S. navy, said it is unusual that the research vessel docked in Sanya, and not its home port. 
</p>

<p> 
“Returning to Sanya is of interest because of the home-porting of PLA (People's Liberation Army) Navy ballistic missile submarines as well as the Shandong aircraft carrier,” he said in an email.
</p>

<p> 
He said he suspected data collected during the journey would go to the Chinese Navy “to improve their situational awareness in the Philippine Sea,” where China has been accused by Manila of challenging Philippine sovereignty through "grey zone" tactics, including the alleged harassment of fishermen, blocking of resupply missions, and use of water cannons against Philippine vessels.
 The Philippine Sea is also considered a focal point for U.S.-China competition, especially as China claims sovereignty over a large swath of the Philippine EEZ.
</p>

<p> 
“This ‘expedition’ was very clearly dual-purpose,” Fanell said.
</p> `
},      

  ],
};
