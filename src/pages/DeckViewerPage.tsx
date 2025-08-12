import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import { sampleDecks } from '../data/sampleDecks.js';
import type { SlideDeck } from '../types/slides.js';
import SlideRenderer from '../components/slides/SlideRenderer.js';

const DeckViewerPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [deck, setDeck] = useState<SlideDeck | null>(null);

  useEffect(() => {
    const foundDeck = sampleDecks.find(d => d.id === deckId);
    if (foundDeck) {
      setDeck(foundDeck);
      // Hide sidebar for cinematic presentations and custom components by default
      const isCinematic = foundDeck.slides.some(slide => 
        slide.content.some(content => content.type === 'cinematic' || content.type === 'custom-react')
      );
      setShowSidebar(!isCinematic);
      
      // For cinematic presentations, start in fullscreen-like mode
      if (isCinematic) {
        setIsFullscreen(false); // Keep it false but use fullscreen styling
      }
    } else {
      navigate('/');
    }
  }, [deckId, navigate]);

  // Check if this is a cinematic presentation or custom component (both get full cinematic treatment)
  const isCinematic = deck?.slides.some(slide => 
    slide.content.some(content => content.type === 'cinematic' || content.type === 'custom-react')
  ) || false;

  // Body style effect for cinematic mode (always declare, conditionally execute)
  useEffect(() => {
    if (isCinematic) {
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflow = 'hidden';
      
      // Force html and body to full dimensions
      document.documentElement.style.margin = '0';
      document.documentElement.style.padding = '0';
      document.documentElement.style.width = '100vw';
      document.documentElement.style.height = '100vh';
      
      return () => {
        document.body.style.margin = '';
        document.body.style.padding = '';
        document.body.style.overflow = '';
        document.documentElement.style.margin = '';
        document.documentElement.style.padding = '';
        document.documentElement.style.width = '';
        document.documentElement.style.height = '';
      };
    }
  }, [isCinematic]);

  const currentSlide = deck?.slides[currentSlideIndex];
  const totalSlides = deck?.slides.length || 0;

  const goToNextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPreviousSlide();
      if (e.key === 'ArrowRight') goToNextSlide();
      if (e.key === 'Escape') setIsFullscreen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, totalSlides]);

  if (!deck) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <div className="text-gray-400 text-4xl mb-4">📂</div>
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Deck not found</h2>
          <p className="text-gray-400">The requested slide deck could not be found.</p>
        </div>
      </div>
    );
  }

  if (isCinematic) {
    // Full cinematic mode - no header, no sidebar, just the slide
    return (
      <div className="cinematic-mode bg-slate-900 z-50">
        <div className="absolute inset-0 w-full h-full">
          {currentSlide && <SlideRenderer slide={currentSlide} />}
          
          {/* Minimal navigation controls for cinematic mode */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-2 bg-black/30 backdrop-blur-sm p-3 rounded-2xl">
            <button
              onClick={goToPreviousSlide}
              disabled={currentSlideIndex === 0}
              className="px-4 py-2 bg-slate-700/50 text-white rounded-xl hover:bg-slate-600/70 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←
            </button>
            <span className="text-white font-semibold px-4">
              {currentSlideIndex + 1} / {totalSlides}
            </span>
            <button
              onClick={goToNextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              className="px-4 py-2 bg-slate-700/50 text-white rounded-xl hover:bg-slate-600/70 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              →
            </button>
            <button
              onClick={() => navigate('/')}
              className="ml-4 px-4 py-2 bg-red-600/50 text-white rounded-xl hover:bg-red-500/70 transition-colors duration-200"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Regular presentation mode with header and optional sidebar
  const containerClass = isFullscreen 
    ? 'h-screen w-screen bg-black text-white' 
    : 'min-h-screen bg-gray-50';

  return (
    <div className={containerClass}>
      {/* Header (only in normal mode) */}
      {!isFullscreen && (
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Data Room</span>
              </button>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-lg font-semibold text-gray-900">{deck.title}</h1>
                <p className="text-sm text-gray-500">
                  Slide {currentSlideIndex + 1} of {totalSlides}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                title={showSidebar ? 'Hide sidebar' : 'Show sidebar'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showSidebar ? "M4 6h16M4 12h16M4 18h7" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
              <button
                onClick={() => setIsFullscreen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Fullscreen Header */}
      {isFullscreen && (
        <div className="flex items-center justify-between p-4 bg-black bg-opacity-75 text-white">
          <div>
            <h1 className="text-lg font-semibold">{deck.title}</h1>
            <p className="text-sm opacity-75">
              Slide {currentSlideIndex + 1} of {totalSlides}
            </p>
          </div>
          <button
            onClick={() => setIsFullscreen(false)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex h-full">
        {/* Slide Thumbnails (only in normal mode and when sidebar is enabled) */}
        {!isFullscreen && showSidebar && (
          <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Slides</h3>
              <div className="space-y-2">
                {deck.slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      index === currentSlideIndex
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-sm font-medium truncate">{slide.title}</div>
                    <div className="text-xs text-gray-500 mt-1">Slide {index + 1}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Slide Display Area */}
        <div className="flex-1 flex flex-col">
          {/* Slide Content */}
          <div className={`flex-1 flex items-center justify-center w-full ${isFullscreen ? 'p-0' : 'p-8'}`}>
            <div className="w-full h-full flex items-center justify-center">
              {currentSlide && <SlideRenderer slide={currentSlide} />}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className={`flex items-center justify-between p-4 ${isFullscreen ? 'bg-black bg-opacity-75' : 'bg-white border-t border-gray-200'}`}>
            <button
              onClick={goToPreviousSlide}
              disabled={currentSlideIndex === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isFullscreen
                  ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30 disabled:opacity-50'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50'
              }`}
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-4">
              <span className={isFullscreen ? 'text-white' : 'text-gray-900'}>
                {currentSlideIndex + 1} of {totalSlides}
              </span>
            </div>
            
            <button
              onClick={goToNextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isFullscreen
                  ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30 disabled:opacity-50'
                  : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckViewerPage;
