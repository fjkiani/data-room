import type { ReactNode } from 'react';

export interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface TrustBadge {
  label: string;
}

export interface ValuePillar {
  icon?: ReactNode;
  title: string;
  text: string;
}

export interface ArchitectureLayer {
  color: string; // tailwind color key e.g., 'cyan'
  icon?: ReactNode;
  title: string;
  features: string[];
}

export interface AIEngineCard {
  icon?: ReactNode;
  name: string;
  features: string[];
  accentColor?: string; // tailwind color key e.g., 'orange'
}

export interface SolutionCard {
  icon?: ReactNode;
  title: string;
  points: string[];
}

export interface DeploymentModel {
  title: string;
  icon?: ReactNode;
  color: string; // tailwind color key
  features: string[];
  pricing: string;
  ideal: string;
}

export interface CompetitiveRow {
  name: string;
  features: string[];
  limitations?: string[];
  score?: string;
  highlight?: boolean;
}

export interface PricingTier {
  title: string;
  price: string;
  description?: string;
  features: string[];
  cta: CTAButton;
  featured?: boolean;
} 