import React from 'react';
import { Calendar, Tag, Lock, Users } from 'lucide-react';
import type { SlideDeck } from '../types/slides.js';
import DeckPreview from './DeckPreview.js';

interface DeckCardProps {
  deck: SlideDeck;
  onClick?: () => void;
  className?: string;
}

const DeckCard: React.FC<DeckCardProps> = ({ deck, onClick, className = '' }) => {
  // Get the custom component for preview if it's a custom-react deck
  const getCustomComponent = () => {
    if (!deck.slides || deck.slides.length === 0) {
      return null;
    }
    const customSlide = deck.slides.find(slide => 
      slide.content && slide.content.some(content => content.type === 'custom-react')
    );
    return customSlide?.content.find(content => content.type === 'custom-react')?.data?.component;
  };

  const getConfidentialityIcon = () => {
    switch (deck.metadata?.confidentiality) {
      case 'confidential':
        return <Lock className="w-4 h-4 text-red-500" />;
      case 'internal':
        return <Users className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getConfidentialityColor = () => {
    switch (deck.metadata?.confidentiality) {
      case 'confidential':
        return 'border-red-200 bg-red-50';
      case 'internal':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  return (
    <div 
      className={`${getConfidentialityColor()} border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200 ${className}`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{deck.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{deck.description}</p>
        </div>
        {getConfidentialityIcon()}
      </div>

      {/* Thumbnail Preview */}
      <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
        {deck.thumbnail ? (
          <img 
            src={deck.thumbnail} 
            alt={`${deck.title} preview`}
            className="w-full h-32 object-cover"
          />
        ) : getCustomComponent() ? (
          <DeckPreview component={getCustomComponent()} width={320} height={128} />
        ) : (
          <div className="w-full h-32 bg-slate-100 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <div className="text-2xl mb-1">📊</div>
              <p className="text-xs">No preview</p>
            </div>
          </div>
        )}
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(deck.updatedAt).toLocaleDateString()}</span>
          </div>
          <span className="text-gray-300">•</span>
          <span>{deck.slides.length} slides</span>
        </div>
        {deck.metadata?.author && (
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {deck.metadata.author}
          </span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {deck.category}
        </span>
        {deck.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
        {deck.tags.length > 3 && (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">
            +{deck.tags.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
};

export default DeckCard; 