export const SCENE = {
  width: 1440,
  height: 900,

  layers: {
    wall: 10,
    desk: 20,
    window: 30,
    decor: 40,
    sidebar: 50,
    navbar: 60,
    modal: 100,
    overlay: 999,
  },

  objects: {
    window: {
      right: 90,
      top: 10,
      w: 550,
      h: 480,
    },

    calendar: {
      right: 400,
      bottom: 50,
      w: 420,
      h: 420,
    },

    mug: {
      left: 220,
      bottom: 50,
      w: 200,
      h: 200,
    },

    quote: {
      left: 420,
      top: 50,
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