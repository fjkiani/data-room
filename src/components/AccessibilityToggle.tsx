import React from 'react';
import { Type, Eye } from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';

interface AccessibilityToggleProps {
  positionClass?: string;
}

const AccessibilityToggle: React.FC<AccessibilityToggleProps> = ({ positionClass = "fixed top-4 right-4 z-50" }) => {
  const { largeTextMode, toggleLargeText } = useAccessibility();

  return (
    <div className={positionClass}>
      <button
        onClick={toggleLargeText}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 ${
          largeTextMode
            ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
            : 'bg-white/10 text-slate-300 border-slate-600 hover:bg-white/20 backdrop-blur-sm'
        }`}
        title={largeTextMode ? 'Disable Large Text' : 'Enable Large Text for Better Readability'}
        aria-label={largeTextMode ? 'Disable Large Text' : 'Enable Large Text'}
      >
        {largeTextMode ? (
          <Eye size={16} />
        ) : (
          <Type size={16} />
        )}
        <span className="text-sm font-medium">
          {largeTextMode ? 'Large Text: ON' : 'Large Text'}
        </span>
      </button>
    </div>
  );
};

export default AccessibilityToggle; 