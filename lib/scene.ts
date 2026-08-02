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
    window: {
      right: 60,
      top: 50,
      w: 550,
      h: 480,
    },

    calendar: {
      right: 330,
      bottom: 120,
      w: 380,
      h: 295,
    },

    timeBox: {
      left: 360,
      bottom: 150,
      w: 330,
      h: 180,
    },

    musicBox: {
      left: 680,
      bottom: 140,
      w: 350,
      h: 240,
    },

    mug: {
      left: 200,
      bottom: -20,
      w: 200,
      h: 200,
    },

    quote: {
      left: 500,
      top: 100,
      w: 190,
      h: 190,
    },

    sidebar: {
      left: 20,
      top: 120,
      w: 260,
      h: 500,
    },
  },
} as const;