import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AccessibilityContextType {
  largeTextMode: boolean;
  toggleLargeText: () => void;
  getTextSize: (baseSize: string) => string;
  getIconSize: (baseSize: number) => number;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [largeTextMode, setLargeTextMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('accessibility.largeTextMode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const applyRootFontSize = (enabled: boolean) => {
    try {
      const root = document.documentElement;
      if (enabled) {
        root.style.fontSize = '18px'; // scale up Tailwind rem-based sizes
        root.setAttribute('data-large-text', 'true');
      } else {
        root.style.fontSize = '';
        root.removeAttribute('data-large-text');
      }
    } catch {}
  };

  useEffect(() => {
    applyRootFontSize(largeTextMode);
  }, [largeTextMode]);

  const toggleLargeText = () => {
    setLargeTextMode(prev => {
      const next = !prev;
      try { localStorage.setItem('accessibility.largeTextMode', JSON.stringify(next)); } catch {}
      applyRootFontSize(next);
      return next;
    });
  };

  // Helper function to scale text sizes
  const getTextSize = (baseSize: string) => {
    if (!largeTextMode) return baseSize;
    
    const sizeMap: { [key: string]: string } = {
      'text-xs': 'text-sm',
      'text-sm': 'text-base',
      'text-base': 'text-lg',
      'text-lg': 'text-xl',
      'text-xl': 'text-2xl',
      'text-2xl': 'text-3xl',
      'text-3xl': 'text-4xl',
      'text-4xl': 'text-5xl',
      'text-5xl': 'text-6xl',
      'text-6xl': 'text-7xl',
      'text-7xl': 'text-8xl',
    };
    
    return sizeMap[baseSize] || baseSize;
  };

  // Helper function to scale icon sizes
  const getIconSize = (baseSize: number) => {
    return largeTextMode ? Math.floor(baseSize * 1.25) : baseSize;
  };

  const value = {
    largeTextMode,
    toggleLargeText,
    getTextSize,
    getIconSize,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}; 