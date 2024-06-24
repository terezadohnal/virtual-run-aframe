export const runningTrackColors = ['#d8572a', '#d8572a', '#d8572a', '#d8572a'];

export const models = [
  {
    id: '#banana',
    class: 'boost',
    scale: '0.007 0.007 0.007',
    rotation: '0 25 -45',
  },
  { id: '#rocks', class: 'obstacle', scale: '0.1 0.1 0.1', rotation: '0 0 0' },
  { id: '#lemonade', class: 'boost', scale: '0.5 0.5 0.5', rotation: '0 0 0' },
  { id: '#spike', class: 'obstacle', scale: '0.2 0.2 0.2', rotation: '0 0 0' },
  { id: '#water', class: 'boost', scale: '0.06 0.06 0.06', rotation: '0 0 0' },
];

export const modelEnergy = {
  '#banana': 2,
  '#lemonade': 3,
  '#water': 1,
  '#rocks': 5,
  '#spike': 7,
};

export const modelWeights = {
  easy: {
    '#banana': 2,
    '#lemonade': 3,
    '#water': 2,
    '#rocks': 1,
    '#spike': 1,
  },
  tempo: {
    '#banana': 2,
    '#lemonade': 2,
    '#water': 2,
    '#rocks': 2,
    '#spike': 2,
  },
  race: {
    '#banana': 1,
    '#lemonade': 1,
    '#water': 1,
    '#rocks': 3,
    '#spike': 3,
  },
};

export const runnersSpeed = {
  easy: (energy) => {
    if (energy > 90) return 0.1;
    if (energy > 80) return 0.09;
    if (energy > 70) return 0.08;
    if (energy > 60) return 0.07;
    if (energy > 50) return 0.06;
    if (energy > 40) return 0.05;
    if (energy > 30) return 0.04;
    if (energy > 20) return 0.03;
    return 0.02;
  },
  tempo: (energy) => {
    if (energy > 90) return 0.1;
    if (energy > 80) return 0.08;
    if (energy > 70) return 0.07;
    if (energy > 60) return 0.06;
    if (energy > 50) return 0.05;
    if (energy > 40) return 0.04;
    if (energy > 30) return 0.03;
    if (energy > 20) return 0.02;
    return 0.02;
  },
  race: (energy) => {
    if (energy > 90) return 0.1;
    if (energy > 80) return 0.07;
    if (energy > 70) return 0.06;
    if (energy > 60) return 0.05;
    if (energy > 50) return 0.04;
    if (energy > 40) return 0.03;
    if (energy > 30) return 0.02;
    if (energy > 20) return 0.01;
    return 0.01;
  },
};

export const DEFAULT_ENERGY_LEVEL = 2;

export const lanes = [-1.7, -0.6, 0.6, 1.7]; // x positions for the 4 lanes
