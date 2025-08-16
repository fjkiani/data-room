import React, { useState } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import { discriminativeAISampleData } from '../../../data/discriminativeAISampleData';

interface InteractiveDemoShowcaseProps {
  selectedDemo?: string;
}

const InteractiveDemoShowcase: React.FC<InteractiveDemoShowcaseProps> = ({
  selectedDemo = 'brca1Analysis'
}) => {
  const { getTextSize } = useAccessibility();
  const [activeDemo, setActiveDemo] = useState(selectedDemo);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demos = discriminativeAISampleData.interactiveDemos;
  const currentDemo = demos[activeDemo as keyof typeof demos];

  const getEndpointColor = (endpoint: string) => {
    const colorMap: { [key: string]: string } = {
      'predict_variant_impact': 'blue',
      'predict_protein_functionality_change': 'red',
      'predict_chromatin_accessibility': 'orange',
      'predict_gene_essentiality': 'green',
      'predict_crispr_spacer_efficacy': 'purple'
    };
    return colorMap[endpoint] || 'blue';
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-600', text: 'text-blue-400', border: 'border-blue-500', light: 'bg-blue-900/20' },
      red: { bg: 'bg-red-600', text: 'text-red-400', border: 'border-red-500', light: 'bg-red-900/20' },
      orange: { bg: 'bg-orange-600', text: 'text-orange-400', border: 'border-orange-500', light: 'bg-orange-900/20' },
      green: { bg: 'bg-green-600', text: 'text-green-400', border: 'border-green-500', light: 'bg-green-900/20' },
      purple: { bg: 'bg-purple-600', text: 'text-purple-400', border: 'border-purple-500', light: 'bg-purple-900/20' }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const playDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= currentDemo.steps.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-8">
      {/* Demo Selector */}
      <div className="flex flex-wrap gap-4 justify-center">
        {Object.entries(demos).map(([key, demo]) => (
          <button
            key={key}
            onClick={() => {
              setActiveDemo(key);
              resetDemo();
            }}
            className={`px-6 py-4 rounded-xl border-2 transition-all duration-200 ${
              activeDemo === key 
                ? 'bg-cyan-600 border-transparent text-white' 
                : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500'
            }`}
          >
            <div className="text-left">
              <div className={`font-semibold ${getTextSize('text-base')}`}>
                {demo.title}
              </div>
              <div className={`text-sm opacity-80 ${getTextSize('text-sm')}`}>
                {demo.description}
              </div>
              <div className={`text-xs opacity-60 mt-1 ${getTextSize('text-xs')}`}>
                {'gene' in demo ? demo.gene : demo.variant}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Demo Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={playDemo}
          disabled={isPlaying}
          className={`px-6 py-3 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors ${getTextSize('text-base')}`}
        >
          {isPlaying ? '▶️ Playing...' : '▶️ Play Demo'}
        </button>
        <button
          onClick={resetDemo}
          className={`px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-semibold transition-colors ${getTextSize('text-base')}`}
        >
          🔄 Reset
        </button>
      </div>

      {/* Demo Visualization */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
        <div className="space-y-8">
          {/* Demo Header */}
          <div className="text-center space-y-4">
            <h3 className={`font-bold text-white ${getTextSize('text-3xl')}`}>
              {currentDemo.title}
            </h3>
            <p className={`text-slate-300 ${getTextSize('text-lg')}`}>
              {currentDemo.description}
            </p>
            <div className={`text-cyan-400 font-mono ${getTextSize('text-xl')}`}>
              {'gene' in currentDemo ? `Target: ${currentDemo.gene}` : `Variant: ${currentDemo.variant}`}
            </div>
            {'context' in currentDemo && (
              <div className={`text-slate-400 ${getTextSize('text-base')}`}>
                Context: {currentDemo.context}
              </div>
            )}
          </div>

          {/* Step Progress */}
          <div className="flex items-center justify-center space-x-4">
            {currentDemo.steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const colors = getColorClasses(getEndpointColor(step.endpoint));
              
              return (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300 ${
                      isActive 
                        ? `${colors.bg} border-transparent text-white scale-110` 
                        : isCompleted
                        ? `${colors.bg} border-transparent text-white`
                        : 'border-slate-600 text-slate-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < currentDemo.steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 transition-colors duration-300 ${
                      isCompleted ? colors.bg : 'bg-slate-600'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Current Step Details */}
          <div className="space-y-6">
            {currentDemo.steps.map((step, index) => {
              if (index > currentStep) return null;
              
              const colors = getColorClasses(getEndpointColor(step.endpoint));
              const isCurrentStep = index === currentStep;
              
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl border transition-all duration-500 ${
                    isCurrentStep 
                      ? `${colors.light} ${colors.border} border-opacity-50 scale-105` 
                      : 'bg-slate-700/30 border-slate-600 opacity-80'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Step Header */}
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center text-white font-bold`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className={`font-bold text-white ${getTextSize('text-xl')}`}>
                          {step.title}
                        </h4>
                        <p className={`text-slate-400 font-mono ${getTextSize('text-sm')}`}>
                          /{step.endpoint}
                        </p>
                      </div>
                    </div>

                    {/* Input/Output */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Input */}
                      <div className="space-y-3">
                        <h5 className={`font-semibold ${colors.text} ${getTextSize('text-base')}`}>
                          Input Parameters
                        </h5>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <pre className={`text-slate-300 ${getTextSize('text-sm')} font-mono`}>
                            {JSON.stringify(step.input, null, 2)}
                          </pre>
                        </div>
                      </div>

                      {/* Output */}
                      <div className="space-y-3">
                        <h5 className={`font-semibold ${colors.text} ${getTextSize('text-base')}`}>
                          Prediction Results
                        </h5>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <div className="space-y-2">
                            {Object.entries(step.result).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className={`text-slate-400 ${getTextSize('text-sm')}`}>
                                  {key}:
                                </span>
                                <span className={`${colors.text} font-mono ${getTextSize('text-sm')}`}>
                                  {typeof value === 'number' ? value.toFixed(3) : value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className={`p-4 ${colors.light} border ${colors.border} border-opacity-30 rounded-lg`}>
                      <p className={`text-slate-200 ${getTextSize('text-base')}`}>
                        💡 <strong>Insight:</strong> {step.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Demo Summary */}
          {currentStep >= currentDemo.steps.length - 1 && (
            <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border border-cyan-600/50 rounded-xl p-6">
              <h4 className={`font-bold text-white mb-4 ${getTextSize('text-xl')}`}>
                🎯 Analysis Summary
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-slate-300 ${getTextSize('text-base')}`}>Final Verdict:</span>
                    <span className={`font-bold text-cyan-400 ${getTextSize('text-base')}`}>
                      {currentDemo.summary.verdict}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-slate-300 ${getTextSize('text-base')}`}>Confidence:</span>
                    <span className={`font-bold text-green-400 ${getTextSize('text-base')}`}>
                      {(currentDemo.summary.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-slate-300 ${getTextSize('text-base')}`}>Clinical Action:</span>
                    <span className={`font-bold text-orange-400 ${getTextSize('text-base')}`}>
                      {currentDemo.summary.clinicalAction}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h5 className={`font-semibold text-slate-200 ${getTextSize('text-base')}`}>
                    Therapeutic Options:
                  </h5>
                  <ul className="space-y-1">
                    {currentDemo.summary.therapeuticOptions.map((option, i) => (
                      <li key={i} className={`text-slate-300 ${getTextSize('text-sm')}`}>
                        • {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemoShowcase; 