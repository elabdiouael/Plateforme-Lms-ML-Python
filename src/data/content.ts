// src/data/content.ts
import { exercises } from './exercises';
import { algorithms } from './modules/algorithms';
import { lists } from './modules/lists';
import { oop } from './modules/oop';
import { project_prepa } from './modules/project_prepa'; // <-- 1. IMPORT

// Fusion de tout le programme
export const slides = [
  ...exercises,   // Warm-up
  ...algorithms,  // Chapitre 1
  ...lists,       // Chapitre 2
  ...oop,         // Chapitre 3
  ...project_prepa // <-- 2. AJOUT A LA FIN
];

// Helper pour la Navbar
export const chapters = {
  "Exercices": 0,
  "Algorithmes": exercises.length,
  "Data Structures": exercises.length + algorithms.length,
  "OOP": exercises.length + algorithms.length + lists.length,
  "Project Prepa": exercises.length + algorithms.length + lists.length + oop.length // <-- 3. NOUVEAU CHAPITRE
};