import { exercises } from './exercises';
import { algorithms } from './modules/algorithms';
import { lists } from './modules/lists';
import { oop } from './modules/oop';

// Fusion de tout le programme
export const slides = [
  ...exercises,   // Warm-up (QCM)
  ...algorithms,  // Chapitre 1
  ...lists,       // Chapitre 2
  ...oop          // Chapitre 3
];

// Helper pour la Navbar (On l'utilisera dans le prochain step)
export const chapters = {
  "Exercices": 0,
  "Algorithmes": exercises.length,
  "Data Structures": exercises.length + algorithms.length,
  "OOP": exercises.length + algorithms.length + lists.length
};