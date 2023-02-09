export const SIZE = [500, 500];
export const SCALE: number = 20;
export const TIME_DELAY: number = 100;
export const DIRECTIONS = {
  37: [-1, 0],
  39: [1, 0],
  38: [0 - 1],
  40: [0, 1],
};
export const INITIAL_SNAKE = [
  [0, 1],
  [0, 2],
];
export const INITIAL_FOOD = [
  Math.floor((Math.random() * SIZE[0]) / SCALE),
  Math.floor((Math.random() * SIZE[0]) / SCALE),
];
