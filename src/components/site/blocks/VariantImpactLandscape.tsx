import React from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';

interface VariantData {
  position: number;
  ref: string;
  alt: string;
  deltaLikelihood: number;
  pathogenicity: 'Pathogenic' | 'Benign' | 'VUS';
  confidence: number;
  consequence: string;
  gene?: string;
}

interface GenomicRegion {
  start: number;
  end: number;
  type: 'exon' | 'intron' | 'promoter' | 'enhancer' | 'intergenic';
  name?: string;
}

interface VariantImpactLandscapeProps {
  locus: string;
  variants: VariantData[];
  regions: GenomicRegion[];
  windowSize: number;
  metrics?: {
    totalVariants: number;
    pathogenicCount: number;
    vusResolved: number;
    avgConfidence: number;
  };
}

const VariantImpactLandscape: React.FC<VariantImpactLandscapeProps> = ({
  locus,
  variants,
  regions,
  windowSize,
  metrics
}) => {
  const { getTextSize } = useAccessibility();

  const getPathogenicityColor = (pathogenicity: string, confidence: number) => {
    const alpha = Math.max(0.3, confidence);
    switch (pathogenicity) {
      case 'Pathogenic': return `rgba(239, 68, 68, ${alpha})`; // red
      case 'Benign': return `rgba(34, 197, 94, ${alpha})`; // green
      case 'VUS': return `rgba(156, 163, 175, ${alpha})`; // gray
      default: return `rgba(156, 163, 175, ${alpha})`;
    }
  };

  const getRegionColor = (type: string) => {
    switch (type) {
      case 'exon': return 'bg-blue-600';
      case 'intron': return 'bg-slate-600';
      case 'promoter': return 'bg-green-600';
      case 'enhancer': return 'bg-yellow-600';
      case 'intergenic': return 'bg-gray-600';
      default: return 'bg-slate-600';
    }
  };

  const getDeltaLikelihoodIntensity = (delta: number) => {
    // More negative = more disruptive = higher intensity
    const intensity = Math.min(1, Math.abs(delta) / 3);
    return intensity;
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-bold text-white ${getTextSize('text-xl')}`}>
              🗺️ Variant Impact Landscape
            </h3>
            <p className={`text-slate-300 ${getTextSize('text-sm')}`}>
              {locus} • {windowSize.toLocaleString()} bp window
            </p>
          </div>
          {metrics && (
            <div className="text-right">
              <div className={`font-bold text-blue-400 ${getTextSize('text-2xl')}`}>
                {((metrics.pathogenicCount / metrics.totalVariants) * 100).toFixed(1)}%
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>
                Pathogenic Rate
              </div>
            </div>
          )}
        </div>

        {/* Metrics Overview */}
        {metrics && (
          <div className="grid grid-cols-4 gap-4 p-4 bg-slate-700/50 rounded-lg">
            <div className="text-center">
              <div className={`font-bold text-blue-400 ${getTextSize('text-lg')}`}>
                {metrics.totalVariants.toLocaleString()}
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>Total Variants</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-red-400 ${getTextSize('text-lg')}`}>
                {metrics.pathogenicCount}
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>Pathogenic</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-green-400 ${getTextSize('text-lg')}`}>
                {metrics.vusResolved}
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>VUS Resolved</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-cyan-400 ${getTextSize('text-lg')}`}>
                {(metrics.avgConfidence * 100).toFixed(1)}%
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>Avg Confidence</div>
            </div>
          </div>
        )}

        {/* Genomic Regions Track */}
        <div className="space-y-2">
          <h4 className={`font-semibold text-slate-200 ${getTextSize('text-base')}`}>
            Genomic Regions
          </h4>
          <div className="relative h-8 bg-slate-700 rounded">
            {regions.map((region, index) => {
              const width = ((region.end - region.start) / windowSize) * 100;
              const left = ((region.start) / windowSize) * 100;
              return (
                <div
                  key={index}
                  className={`absolute h-full ${getRegionColor(region.type)} opacity-80`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                  title={`${region.type}${region.name ? `: ${region.name}` : ''}`}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span>Exon</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-slate-600 rounded"></div>
              <span>Intron</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span>Promoter</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-600 rounded"></div>
              <span>Enhancer</span>
            </div>
          </div>
        </div>

        {/* Variant Impact Visualization */}
        <div className="space-y-2">
          <h4 className={`font-semibold text-slate-200 ${getTextSize('text-base')}`}>
            Variant Impact Distribution
          </h4>
          <div className="relative h-32 bg-slate-700 rounded overflow-hidden">
            {variants.map((variant, index) => {
              const left = ((variant.position - Math.min(...variants.map(v => v.position))) / windowSize) * 100;
              const height = getDeltaLikelihoodIntensity(variant.deltaLikelihood) * 100;
              return (
                <div
                  key={index}
                  className="absolute bottom-0 w-1 transition-all duration-200 hover:w-2 cursor-pointer"
                  style={{
                    left: `${left}%`,
                    height: `${height}%`,
                    backgroundColor: getPathogenicityColor(variant.pathogenicity, variant.confidence)
                  }}
                  title={`${variant.ref}>${variant.alt} | ${variant.pathogenicity} | Δ${variant.deltaLikelihood.toFixed(2)}`}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Low Impact</span>
            <span>High Impact</span>
          </div>
        </div>

        {/* Top Pathogenic Variants */}
        <div className="space-y-3">
          <h4 className={`font-semibold text-slate-200 ${getTextSize('text-base')}`}>
            Top Pathogenic Variants
          </h4>
          {variants
            .filter(v => v.pathogenicity === 'Pathogenic')
            .sort((a, b) => a.deltaLikelihood - b.deltaLikelihood)
            .slice(0, 5)
            .map((variant, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                                         <span className={`font-mono text-cyan-300 ${getTextSize('text-sm')}`}>
                       {variant.ref}&gt;{variant.alt}
                     </span>
                    <span className={`text-slate-400 ${getTextSize('text-xs')}`}>
                      {variant.gene && `${variant.gene} • `}pos: {variant.position.toLocaleString()}
                    </span>
                  </div>
                  <div className={`text-slate-400 ${getTextSize('text-xs')} mt-1`}>
                    {variant.consequence}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`font-bold text-red-400 ${getTextSize('text-sm')}`}>
                      {variant.deltaLikelihood.toFixed(2)}
                    </div>
                    <div className={`text-slate-500 ${getTextSize('text-xs')}`}>Δ Likelihood</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`font-bold text-orange-400 ${getTextSize('text-sm')}`}>
                      {(variant.confidence * 100).toFixed(1)}%
                    </div>
                    <div className={`text-slate-500 ${getTextSize('text-xs')}`}>Confidence</div>
                  </div>
                  
                  <div className="px-2 py-1 bg-red-900/30 border border-red-700/50 rounded text-red-300 text-xs">
                    Pathogenic
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Performance Indicators */}
        <div className="flex items-center justify-between p-3 bg-blue-900/20 border border-blue-700/50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-blue-400">🎯</span>
            <span className={`text-blue-300 font-medium ${getTextSize('text-sm')}`}>
              Zero-shot AUROC: 95.7%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">📊</span>
            <span className={`text-blue-300 font-medium ${getTextSize('text-sm')}`}>
              VUS resolution: 73%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantImpactLandscape; 