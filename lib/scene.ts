export const SCENE = {
  design: {
    width: 1800,
    height: 860,
  },

  runtime: {
    minScale: 0.5,
    maxScale: 1,
    fit: "contain",
  },

  room: {
    wallHeight: 1024,
    deskHeight: 204,
    wallDivider: 361,
  },

  layers: {
    wall: 10,
    desk: 20,
    window: 30,
    furniture: 35,
    decor: 40,
    sidebar: 50,
    navbar: 60,
    modal: 100,
    overlay: 999,
  },

  objects: {
    tempHumidity: {
      w: 120,
      h: 130,
      right: 640,
      top: 250,
    },

    window: {
      right: 60,
      top: 50,
      w: 550,
      h: 480,
    },

    wallTable: {
      right: 780,
      top: 200,
      w: 300,
      h: 40,
    },

    camera: {
      left: 750,
      top: 112,
      w: 145,
      h: 95,
    },

    calendar: {
      right: 350,
      bottom: 120,
      w: 380,
      h: 295,
    },

    timeBox: {
      left: 340,
      bottom: 125,
      w: 345,
      h: 190,
    },

    musicBox: {
      left: 680,
      bottom: 140,
      w: 340,
      h: 230,
    },

    mug: {
      left: 200,
      bottom: -10,
      w: 200,
      h: 200,
    },

    plant: {
      right: 170,
      bottom: 130,
      w: 150,
      h: 180,
    },

    books: {
      right: 20,
      bottom: 105,
      w: 190,
      h: 340,
    },

    quote: {
      left: 480,
      top: 70,
      w: 190,
      h: 190,
    },

    keynote: {
      left: 500,
      top: 370,
      w: 120,
      h: 120,
    },

    sidebar: {
      left: 24,
      top: 100,
      w: 260,
      h: 500,
    },
  },
} as const;