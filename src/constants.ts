interface direction {
  LEFT: number[];
  RIGHT: number[];
  UP: number[];
  DOWN: number[];
}

export const SIZE: number[] = [512, 512];
export const SCALE: number = 32;
export const START_SNAKE: number[][] = [
  [Math.floor(SIZE[0] / SCALE) / 4, Math.floor(SIZE[0] / SCALE) / 2],
  [Math.floor(SIZE[0] / SCALE) / 4, Math.floor(SIZE[1] / SCALE) / 2],
];
export const START_FOOD: number[] = [
  Math.floor(SIZE[0] / SCALE) / 2,
  Math.floor(SIZE[0] / SCALE) / 2,
];
export const DIRECTIONS: direction = {
  LEFT: [-1, 0],
  RIGHT: [1, 0],
  UP: [0, -1],
  DOWN: [0, 1],
};
export const DELAY: number = 100;
