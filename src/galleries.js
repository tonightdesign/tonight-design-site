// Client delivery galleries. Each key is a page at /<key> (route in App.jsx)
// with a password-gated download handled by worker/galleries.js.
// rows: desktop rows by photo index; every row shares one height.
export const GALLERIES = {
  yuu: {
    title: 'YUU',
    sub: 'Temaki + HiFi Bar · Soft opening 27.11.26',
    photos: [
      { src: '/work/yuu/yuu-01.webp', w: 1400, h: 2489 },
      { src: '/work/yuu/yuu-02.webp', w: 1400, h: 2488 },
      { src: '/work/yuu/yuu-03.webp', w: 1400, h: 2489 },
      { src: '/work/yuu/yuu-04.webp', w: 1400, h: 2489 },
      { src: '/work/yuu/yuu-05.webp', w: 1400, h: 1867 },
    ],
    rows: [[0, 1, 2], [3, 4]],
  },
  clockit: {
    title: 'CLOCK IT',
    sub: '27.11.26',
    photos: [
      { src: '/work/clockit/clockit-01.webp', w: 1800, h: 1192 },
      { src: '/work/clockit/clockit-02.webp', w: 1800, h: 1192 },
      { src: '/work/clockit/clockit-03.webp', w: 1400, h: 2114 },
      { src: '/work/clockit/clockit-04.webp', w: 1400, h: 2114 },
      { src: '/work/clockit/clockit-05.webp', w: 1800, h: 1192 },
      { src: '/work/clockit/clockit-06.webp', w: 1400, h: 2114 },
      { src: '/work/clockit/clockit-07.webp', w: 1400, h: 2114 },
      { src: '/work/clockit/clockit-08.webp', w: 1400, h: 2114 },
      { src: '/work/clockit/clockit-09.webp', w: 1400, h: 2114 },
      { src: '/work/clockit/clockit-10.webp', w: 1400, h: 2114 },
      { src: '/work/clockit/clockit-11.webp', w: 1400, h: 2114 },
      { src: '/work/clockit/clockit-12.webp', w: 1400, h: 2114 },
      { src: '/work/clockit/clockit-13.webp', w: 1400, h: 2114 },
      { src: '/work/clockit/clockit-14.webp', w: 1400, h: 2114 },
      { src: '/work/clockit/clockit-15.webp', w: 1400, h: 2114 },
    ],
    // the three landscapes each lead a row with two portraits, then two rows of three portraits
    rows: [[0, 2, 3], [1, 5, 6], [4, 7, 8], [9, 10, 11], [12, 13, 14]],
  },
}
