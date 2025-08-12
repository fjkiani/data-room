import React from 'react';

interface DeckPreviewProps {
  component: any;
  width?: number;
  height?: number;
}

const DeckPreview: React.FC<DeckPreviewProps> = ({ 
  component: Component, 
  width = 400, 
  height = 300 
}) => {
  if (!Component) {
    return (
      <div 
        className="bg-slate-900 flex items-center justify-center text-slate-400"
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p>Preview</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="overflow-hidden relative bg-slate-900"
      style={{ width, height }}
    >
      {/* Scale down the component to fit in preview */}
      <div 
        className="origin-top-left"
        style={{ 
          transform: `scale(${Math.min(width / 1920, height / 1080)})`,
          width: '1920px',
          height: '1080px'
        }}
      >
        <Component />
      </div>
    </div>
  );
};

export default DeckPreview; 