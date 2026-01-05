// src/data/content.ts
import { exercises } from './exercises';
import { algorithms } from './modules/algorithms';
import { lists } from './modules/lists';
import { oop } from './modules/oop';
import { project_prepa } from './modules/project_prepa';
import { project_ds } from './modules/projet_ds'; // <--- 1. IMPORT NOUVEAU

// Fusion de tout le programme
export const slides = [
  ...exercises,
  ...algorithms,
  ...lists,
  ...oop,
  ...project_prepa,
  ...project_ds // <--- 2. AJOUT A LA FIN
];

// Helper pour la Navbar & Navigation
export const chapters = {
  "Exercices": 0,
  "Algorithmes": exercises.length,
  "Data Structures": exercises.length + algorithms.length,
  "OOP": exercises.length + algorithms.length + lists.length,
  "Project Prepa": exercises.length + algorithms.length + lists.length + oop.length,
  "Project DS": exercises.length + algorithms.length + lists.length + oop.length + project_prepa.length // <--- 3. CALCUL INDEX
};