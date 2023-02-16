interface direction {
  LEFT: number[];
  RIGHT: number[];
  UP: number[];
  DOWN: number[];
}

export const SIZE: number[] = [512, 512];
export const SCALE: number = 32;
export const START_SNAKE: number[][] = [
  [3, 8],
  [3, 8],
];
export const START_FOOD: number[] = [8, 8];
export const DIRECTIONS: direction = {
  LEFT: [-1, 0],
  RIGHT: [1, 0],
  UP: [0, -1],
  DOWN: [0, 1],
};
export const DELAY: number = 100;
