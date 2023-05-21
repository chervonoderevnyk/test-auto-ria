

export enum BMW {
  x1 = 'x1',
  x2 = 'x2',
}

export enum toyota {
  land = 'land',
  supra = 'supra',
}

// @@index([BMW, toyota])
// export enum modelNames {}

const modelNames = { BMW, toyota };
