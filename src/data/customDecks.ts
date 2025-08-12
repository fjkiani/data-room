// Super simple custom deck system
import type { SlideDeck } from '../types/slides.js';

// Import your custom components here
import RUNX1Component from './decks/runx1.jsx';
import crisPRO101 from './decks/101.jsx';
import ZetaShieldSecurity from './decks/security.jsx';

// Helper function to create a deck from just a component
export const createCustomDeck = (
  id: string,
  title: string,
  description: string,
  component: any,
  author = 'Unknown',
  category = 'research',
  thumbnail?: string
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
    confidentiality: 'internal'
  },
  slides: [{
    id: `${id}-slides`,
    title,
    content: [{
      type: 'custom-react',
      data: { component },
      layout: 'full'
    }]
  }]
});

// Your custom decks
export const customDecks: SlideDeck[] = [
  // Your RUNX1 deck - automatically shows first slide as thumbnail
  createCustomDeck(
    'runx1-original',
    'The RUNX1 Conquest (Original)',
    'How Our Agentic Platform Solved a Multi-Year Leukemia Grant In Silico',
    RUNX1Component,
    'Fahad Kiani',
    'product' // Category - thumbnail auto-generated from first slide
  ),
  
  // Your CrisPRO 101 deck
  createCustomDeck(
    'crispro-101',
    'CrisPRO 101',
    'Introduction to CrisPRO platform and capabilities',
    crisPRO101,
    'Fahad Kiani',
    'product' // Category - thumbnail auto-generated from first slide
  ),

  // Zeta Shield Security Presentation
  createCustomDeck(
    'zeta-shield-security',
    'Zeta Shield: Security Operating System',
    'Comprehensive security architecture for AI-driven R&D - featuring agent monitoring, threat detection, compliance, and verifiable access control',
    ZetaShieldSecurity,
    'Fahad Kiani',
    'product' // Category - security and product showcase
  ),
]; 