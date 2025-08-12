import React from 'react';
import type { Slide } from '../../types/slides.js';
import CustomReactContent from './content/CustomReactContent.js';

interface SlideRendererProps {
  slide: Slide;
}

const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  return (
    <div className="w-full h-full">
      {slide.content.map((content, index) => {
        if (content.type === 'custom-react') {
          return <CustomReactContent key={index} data={content.data} />;
        }
        // Add more content types here as needed
        return <div key={index}>Unsupported content type</div>;
      })}
    </div>
  );
};

export default SlideRenderer; 