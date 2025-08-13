export interface SlideContent {
  type: 'text' | 'image' | 'chart' | 'table' | 'video' | 'list' | 'quote' | 'code' | 'diagram' | 'pathway' | 'comparison' | 'metrics' | 'cinematic' | 'custom-react';
  data: any;
  layout?: 'full' | 'split' | 'centered' | 'sidebar' | 'grid' | 'timeline';
  animation?: 'fadeIn' | 'slideIn' | 'zoomIn' | 'pulse' | 'bounce';
}

export interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  content: SlideContent[];
  backgroundStyle?: 'default' | 'gradient' | 'image' | 'dark' | 'animated' | 'particle';
  backgroundConfig?: {
    colors?: string[];
    animation?: 'particles' | 'dna' | 'network' | 'waves';
    intensity?: 'low' | 'medium' | 'high';
  };
  transition?: 'fade' | 'slide' | 'zoom';
  theme?: 'corporate' | 'scientific' | 'dark' | 'futuristic';
}

export interface SlideDeck {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  slides: Slide[];
  metadata?: {
    author?: string;
    version?: string;
    confidentiality?: 'public' | 'internal' | 'confidential';
    template?: string;
    theme?: 'corporate' | 'scientific' | 'dark' | 'futuristic';
    previewImage?: string;
    blurb?: string;
  };
}

export interface DeckCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// New interfaces for advanced content types
export interface PathwayData {
  steps: Array<{
    id: string;
    title: string;
    description: string;
    icon?: string;
    status?: 'normal' | 'highlight' | 'warning' | 'danger';
    animation?: string;
  }>;
  connections?: Array<{
    from: string;
    to: string;
    style?: 'arrow' | 'line' | 'dashed';
  }>;
}

export interface ComparisonData {
  title?: string;
  items: Array<{
    title: string;
    description: string;
    pros?: string[];
    cons?: string[];
    metrics?: { [key: string]: string | number };
    status?: 'advantage' | 'disadvantage' | 'neutral';
  }>;
}

export interface MetricsData {
  title?: string;
  metrics: Array<{
    label: string;
    value: string | number;
    unit?: string;
    trend?: 'up' | 'down' | 'stable';
    status?: 'good' | 'warning' | 'danger';
    description?: string;
  }>;
  layout?: 'grid' | 'list' | 'dashboard';
}

export interface DiagramData {
  type: 'flowchart' | 'network' | 'hierarchy' | 'timeline';
  nodes: Array<{
    id: string;
    label: string;
    type?: string;
    position?: { x: number; y: number };
    style?: any;
  }>;
  edges?: Array<{
    from: string;
    to: string;
    label?: string;
    style?: any;
  }>;
} 