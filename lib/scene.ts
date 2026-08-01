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
      right: 450,
      bottom: 10,
      w: 420,
      h: 328,
    },

    timeBox: {
      left: 380,
      bottom: 140,
      w: 330,
      h: 180,
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