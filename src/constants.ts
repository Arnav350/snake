interface direction {
  LEFT: number[];
  RIGHT: number[];
  UP: number[];
  DOWN: number[];
}

export const SIZE: number[] = [1000, 1000];
export const SCALE: number = 50;
export const START_SNAKE: number[][] = [
  [4, 10],
  [4, 10],
];
export const START_FOOD: number[] = [10, 10];
export const DIRECTIONS: direction = {
  LEFT: [-1, 0],
  RIGHT: [1, 0],
  UP: [0, -1],
  DOWN: [0, 1],
};
export const DELAY: number = 100;
