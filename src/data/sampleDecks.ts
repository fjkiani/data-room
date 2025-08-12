import type { SlideDeck, DeckCategory } from '../types/slides.js';
import { customDecks } from './customDecks.js';

export const categories: DeckCategory[] = [
  {
    id: 'research',
    name: 'case studies',
    description: 'case studies presentations and findings',
    icon: '🔬',
    color: 'blue'
  },
  {
    id: 'product',
    name: 'Product',
    description: 'Product demos and showcases',
    icon: '📦',
    color: 'green'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Marketing presentations and campaigns',
    icon: '📈',
    color: 'purple'
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Financial reports and analysis',
    icon: '💰',
    color: 'yellow'
  },
];

export const sampleDecks: SlideDeck[] = [
  // Add custom decks
  ...customDecks,
]; 