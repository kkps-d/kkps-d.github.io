// Contains the data to render the portfolio page
export const portfolioData = [
  // {
  //   year: "ongoing",
  //   projects: [
  //     {
  //       cardTitle: "services",
  //       cardDesc:
  //         "all the services hosted from my homelab. you may need to request permission to access some of them.",
  //       cardImgPath:
  //         "https://p1.pxfuel.com/preview/653/702/399/rose-flower-flowers-red-rose-royalty-free-thumbnail.jpg",
  //       fullDesc: [
  //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Interdum consectetur libero id faucibus nisl tincidunt eget. Diam in arcu cursus euismod quis viverra nibh.",
  //         "Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan. Aliquet nec ullamcorper sit amet risus nullam. Interdum velit euismod in pellentesque massa placerat duis. Posuere lorem ipsum dolor sit amet. Suspendisse in est ante in nibh mauris. Odio ut sem nulla pharetra. Lacus vel facilisis volutpat est velit. Id volutpat lacus laoreet non curabitur gravida. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. ",
  //       ],
  //       galleryImgPaths: [
  //         "https://images.pexels.com/photos/1400249/pexels-photo-1400249.jpeg?cs=srgb&dl=pexels-mihai-vlasceanu-1400249.jpg&fm=jpg",
  //         "https://cdn.britannica.com/84/73184-050-05ED59CB/Sunflower-field-Fargo-North-Dakota.jpg",
  //         "https://p1.pxfuel.com/preview/653/702/399/rose-flower-flowers-red-rose-royalty-free-thumbnail.jpg",
  //       ],
  //       demoUrl: "https://demo.com",
  //       repoUrl: "",
  //       tags: [],
  //     },
  //   ],
  // },
  {
    year: "2023",
    projects: [
      {
        cardTitle: "Personal Website",
        cardDesc:
          "Website written in React to inform you about myself and showcase my projects",
        cardImgPath: "img/personal-website/card.png",
        fullDesc: [
          "This website is built with React usinng create-react-app. It serves as a personal website to inform you more about myself and as a showcase to my other projects, but it was also a good way to put my React skills into practice.",
          "The website is mostly complete, but there are still a few quirks with the image viewer, and proper mobile support has yet to be added. Feel free to contact me if you have any feedback!",
        ],
        galleryImgPaths: ["img/personal-website/picture1.png"],
        demoUrl: "",
        repoUrl: "https://github.com/kkps-d/kkps-d.github.io",
        tags: [],
      },
      {
        cardTitle: "Gradiotronics",
        cardDesc:
          "Arduino-based in-sole pressure to measure plantar pressure & web app to interact with the data.",
        cardImgPath: "img/gradiotronics/card.png",
        fullDesc: [
          "At Gradiotronics, we're building an insole force sensor that allows us to measure the rate of force development (RFD) of an athlete, which is a measure of how fast an athelete can produce force. The Arduino-based sensor records and transmits the data over Bluetooth Low Energy (BLE) to the web-app.",
          "I was responsible for the web app and Arduino code. It is built in pure HTML, CSS, and JS, and was originally developed as an Electron app, but was converted to a fully web-based app targeting Google Chrome for greater future compatibility with mobile devices. The app can visualize data from the Arduino, either live or recorded, trimmed, and saved to a .csv file. Chart.js and Heatmap.js provide the visuals, but everything else was written from scratch.",
          "Being an interdisciplinary project between Computer Science and Bioengineering, I would like to thank my bioengineers Chelsea Igtanloc, Joaquin Gonzales and Vicky Guan, who did amazing work and got us the Recognition of Excellence in Engineering Design in Bioengineering!",
        ],
        galleryImgPaths: [
          "img/gradiotronics/demo.gif",
          "img/gradiotronics/web-app.png",
          "img/gradiotronics/hardware-assembly.png",
          "img/gradiotronics/prototype-top.png",
          "img/gradiotronics/prototype-bottom.png",
          "img/gradiotronics/sole sensors.jpg",
        ],
        demoUrl: "https://www.kkps.dev/gradiotronics/",
        repoUrl: "https://github.com/kkps-d/gradiotronics",
        tags: [],
      },
      {
        cardTitle: "Typing Tester",
        cardDesc:
          "Typing testing game written in python and pygame featuring multiple game modes and statistics",
        cardImgPath: "img/typing-game/card.png",
        fullDesc: [
          "I worked on this project with three other teammates as part of the coursework, where we practiced being a Scrum team, with me being one of two developers.",
          "The app was written in Python using pygame for the graphics and matplotlib for the statistics at the end of each test. I worked mainly on text rendering for the gameplay and helped developed other features, such as statistics and unit tests.",
        ],
        galleryImgPaths: [
          "img/typing-game/main-menu.png",
          "img/typing-game/typing-test.png",
          "img/typing-game/statistics.png",
        ],
        demoUrl: "https://replit.com/@kkps-d/typing-tester",
        repoUrl:
          "https://github.com/kkps-d/uop-classwork-repository/tree/main/comp-129-software-engineering/typing-tester",
        tags: [],
      },
      {
        cardTitle: "Time Management App",
        cardDesc:
          "interactive figma prototype of a time management app created for human-computer interface class",
        cardImgPath: "img/time-app/card.png",
        fullDesc: [
          "This is an interactive Figma prototype of a time management app that our team developed for Human-Computer Interface class. The app was the product of a semester long research-and-developement cycle.",
          "The app was designed to tackle the lack of integration between a to-do list and a Calendar with events with start and end dates. The big features of the app are being able to see to-do tasks and events on the same screen, and being able to associate tasks to an event on the calendar.",
        ],
        galleryImgPaths: [
          "img/time-app/1.png",
          "img/time-app/2.png",
          "img/time-app/3.png",
          "img/time-app/4.png",
          "img/time-app/5.png",
        ],
        demoUrl:
          "https://www.figma.com/proto/2u5BolbjmlhcVWZAukkZev/Final-prototype?page-id=0%3A1&type=design&node-id=231-2&viewport=1701%2C-354%2C0.22&t=up6zbOScm7vhVc5Z-1&scaling=scale-down&starting-point-node-id=231%3A2&show-proto-sidebar=1&mode=design",
        repoUrl: "",
        tags: [],
      },
    ],
  },
  {
    year: "2022",
    projects: [
      {
        cardTitle: "Expression Evaluator",
        cardDesc:
          "Basic mathematical expression parser and evaluator in Python written as part of coursework",
        cardImgPath: "img/exp-eval/card.png",
        fullDesc: [
          "I built a basic mathematical expression parser and evaluator in Python that is part of a toy imperative language. The objective of the project was to learn how recursive descent parsers work as part of the coursework for COMP 141 Programming Languages",
        ],
        galleryImgPaths: ["img/exp-eval/1.png"],
        demoUrl: "https://replit.com/@kkps-d/expression-evaluator#Readme.md",
        repoUrl:
          "https://github.com/kkps-d/uop-classwork-repository/tree/main/comp-141-programming-languages",
        tags: [],
      },
      {
        cardTitle: "Closest Pair Finder",
        cardDesc:
          "Web-based visualizer for closest pair finding algorithms written as part of coursework",
        cardImgPath: "img/pair-finder/card.png",
        fullDesc: [
          "Web-based visualizer to compare algorithms that finds the closest pair of points within the provided points.",
        ],
        galleryImgPaths: ["img/pair-finder/1.png"],
        demoUrl: "https://www.kkps.dev/closest-pair-finder/",
        repoUrl: "https://github.com/kkps-d/closest-pair-finder",
        tags: [],
      },
    ],
  },
  {
    year: "2021",
    projects: [
      {
        cardTitle: "Discord Bot",
        cardDesc:
          "Written in Node.js with Discord.js to help manage discord server and add features",
        cardImgPath: "img/discord-bot/card.png",
        fullDesc: [
          "A Discord Bot written in Node.js and the Electron.js library. It is mainly used to assign roles to the users according to how much time they have spent in voice chat, but it can also show the time spent of each user and send rich messages on behalf of an admin.",
          "The two latter features can be performed on the web-based control panel, which communicates with the Node.js process via Socket.io.",
        ],
        galleryImgPaths: [
          "img/discord-bot/1.png",
          "img/discord-bot/2.png",
          "img/discord-bot/3.png",
          "img/discord-bot/4.png",
        ],
        demoUrl: "",
        repoUrl: "https://github.com/kkps-d/diedenieded-bot",
        tags: [],
      },
      // {
      //   cardTitle: "sudoku",
      //   cardDesc:
      //     "a console-based sudoku game written in C as part of coursework",
      //   cardImgPath:
      //     "https://p1.pxfuel.com/preview/653/702/399/rose-flower-flowers-red-rose-royalty-free-thumbnail.jpg",
      //   fullDesc: ["test", "test"],
      //   galleryImgPaths: ["1.png", "2.png"],
      //   demoUrl: "https://demo.com",
      //   repoUrl: "",
      //   tags: [],
      // },
      {
        cardTitle: "Hangman",
        cardDesc:
          "A command-line game written in C and ported to MIPS assembly as part of coursework",
        cardImgPath: "img/hangman/card.png",
        fullDesc: [
          "A hangman game written in C for the command-line. It is then ported to and optimized for MIPS assembly which is run on QtSpim on Ubuntu.",
        ],
        galleryImgPaths: ["img/hangman/1.png"],
        demoUrl: "https://replit.com/@kkps-d/hangman",
        repoUrl:
          "https://github.com/kkps-d/uop-classwork-repository/tree/main/ecpe-170-computer-systems-and-networking/lab12",
        tags: [],
      },
    ],
  },
  {
    year: "2020",
    projects: [
      {
        cardTitle: "Wi-Fi LED strip",
        cardDesc:
          "LED strip based on ESP-32 running Arduino C++ controlled by a web interface",
        cardImgPath: "img/wifi-light/card.png",
        fullDesc: [
          "An ESP-32 wired to a LED strip connects to an MQTT server running on a Raspberry Pi over WiFi. It gets picked up by a Node.js client scanning the network for these ESP-32 devices. The client can control the ESP-32 via the web interface.",
        ],
        galleryImgPaths: [
          "img/wifi-light/1.mp4",
          "img/wifi-light/2.mp4",
          "img/wifi-light/3.mp4",
        ],
        demoUrl: "",
        repoUrl: "https://github.com/kkps-d/Home32-Server",
        tags: [],
      },
      // {
      //   cardTitle: "Mario-like game",
      //   cardDesc:
      //     "Mario-like game written in Java with the acm graphics library for coursework",
      //   cardImgPath:
      //     "https://p1.pxfuel.com/preview/653/702/399/rose-flower-flowers-red-rose-royalty-free-thumbnail.jpg",
      //   fullDesc: ["test", "test"],
      //   galleryImgPaths: ["1.png", "2.png"],
      //   demoUrl: "https://demo.com",
      //   repoUrl:
      //     "https://github.com/kkps-d/uop-classwork-repository/tree/main/comp-55-application-development/groupproject-team-5-mario-clone",
      //   tags: [],
      // },
    ],
  },
  {
    year: "2019",
    projects: [
      {
        cardTitle: "photo gallery",
        cardDesc:
          "A web photo gallery showcasing a tour of my team around the UOP campus",
        cardImgPath: "img/gallery/card.png",
        fullDesc: [
          "Designed a static website that showcases photos of me and my friends around the UOP campus as part of coursework.",
        ],
        galleryImgPaths: ["img/gallery/1.png", "img/gallery/2.png"],
        demoUrl: "https://kkps.dev/engr-gp-8/",
        repoUrl: "https://github.com/kkps-d/engr-gp-8",
        tags: [],
      },
    ],
  },
];
