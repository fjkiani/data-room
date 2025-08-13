// Super simple custom deck system
import type { SlideDeck } from '../types/slides.js';

// Import your custom components here
import RUNX1Component from './decks/runx1.jsx';
import crisPRO101 from './decks/101.jsx';
import ZetaShieldSecurity from './decks/security.jsx';

// Helper function to create a deck from a source ({ component } | { importer })
export const createCustomDeck = (
  id: string,
  title: string,
  description: string,
  source: { component?: any; importer?: () => Promise<{ default: React.ComponentType<any> } | any> },
  author = 'Unknown',
  category = 'research',
  thumbnail?: string,
  blurb?: string
): SlideDeck => ({
  id,
  title,
  description,
  category,
  thumbnail, // This shows as the preview image on the deck card
  tags: ['custom'],
  createdAt: new Date().toISOString().split('T')[0],
  updatedAt: new Date().toISOString().split('T')[0],
  metadata: { 
    author, 
    template: 'custom', 
    confidentiality: 'internal',
    blurb // Add the blurb to metadata
  },
  slides: [{
    id: `${id}-slides`,
    title,
    content: [{
      type: 'custom-react',
      data: source.importer ? { importer: source.importer } : { component: source.component },
      layout: 'full'
    }]
  }]
});

// Your custom decks
export const customDecks: SlideDeck[] = [
  // Your RUNX1 deck - eager import to avoid hook context issues
  createCustomDeck(
    'runx1-original',
    'The RUNX1 Conquest (Original)',
    'How Our Agentic Platform Solved a Multi-Year Leukemia Grant In Silico',
    { component: RUNX1Component },
    'Fahad Kiani',
    'product', // Category - thumbnail auto-generated from first slide
    undefined,
    `A documented case study of automating RUNX1 variant interpretation and therapeutic design. .`
  ),
  
  // Your CrisPRO 101 deck (eager, small)
  createCustomDeck(
    'crispro-101',
    'CrisPRO 101',
    'Introduction to CrisPRO platform and capabilities',
    { component: crisPRO101 },
    'Fahad Kiani',
    'product', // Category - thumbnail auto-generated from first slide
    undefined,
    `An overview of CrisPRO’s agentic  engines (Oracle, Forge, Boltz), and how they work together to solve `
  ),

  // Zeta Shield Security Presentation - eager import to avoid hook context issues
  createCustomDeck(
    'zeta-shield-security',
    'Zeta Shield: Security Operating System',
    'Comprehensive security architecture for AI-driven R&D - featuring agent monitoring, threat detection, compliance, and verifiable access control',
    { component: ZetaShieldSecurity },
    'Fahad Kiani',
    'product', // Category - security and product showcase
    undefined, // thumbnail
    `Protecting digital blueprint for a multi-billion dollar cure, which can be contained in a few kilobytes of sequence data.

`
  ),
]; 