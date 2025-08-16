import React from 'react';
import { OracleScore, GuidedDesignPanel, SequencePeaksViewer, OracleExplainTrack } from './';
import { renderContextualComponent } from '../../../utils/componentRenderer';
import type { IndustryProblem, ValueProposition, TransformationSummary } from '../../../data/oracleContent';
import type { ComponentConfig } from '../../../types/transformation';

export type BusinessTransformationProps = {
  productName: string;
  industryProblem: IndustryProblem;
  valuePropositions: ValueProposition[];
  summary: TransformationSummary;
  components?: {
    explainTrack?: any;
    guidedDesign?: any;
    sequencePeaks?: any;
  };
  className?: string;
};

const BusinessTransformation: React.FC<BusinessTransformationProps> = ({
  productName,
  industryProblem,
  valuePropositions,
  summary,

  className = ''
}) => {
  return (
    <section className={`space-y-12 ${className}`}>
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-semibold text-white">Biotech R&D Transformation</h2>
        <p className="text-lg text-slate-300 max-w-4xl mx-auto">
          From 90% failure rates to predictable success: How {productName} eliminates the guesswork in therapeutic development
        </p>
      </div>

      {/* Industry Problem */}
      <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-700/50 rounded-xl p-8">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-red-300">{industryProblem.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {industryProblem.metrics.map((metric, i) => (
              <div key={i}>
                <div className="text-4xl font-black text-red-400">{metric.value}</div>
                <div className="text-red-300">{metric.label}</div>
                <div className="text-xs text-red-400 mt-1">{metric.subtitle}</div>
              </div>
            ))}
          </div>
          <p className="text-red-200 max-w-3xl mx-auto">
            {industryProblem.description}
          </p>
        </div>
      </div>

      {/* Value Propositions */}
      {valuePropositions.map((vp, index) => (
        <div key={index} className="space-y-6">
          <h3 className="text-2xl font-semibold text-white">{index + 1}. {vp.title}</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Traditional Approach</h4>
                <div className="space-y-3">
                  {vp.comparison.traditional.map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-red-900/30 border border-red-700/50 rounded">
                      <span className="text-red-200">{item.label}</span>
                      <span className="text-red-300 font-mono">{item.cost}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">{productName}-Powered Approach</h4>
                <div className="space-y-3">
                  {vp.comparison.oracle.map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-green-900/30 border border-green-700/50 rounded">
                      <span className="text-green-200">{item.label}</span>
                      <span className="text-green-300 font-mono">{item.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Dynamic component rendering based on value proposition */}
              {vp.components?.primary?.type === 'oracleScore' && (
                <OracleScore {...vp.components.primary.config} />
              )}
              
              {vp.components?.primary?.type === 'explainTrack' && (
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">{productName} Explain Track</h4>
                  <p className="text-sm text-slate-300 mb-4">
                    <span className="font-medium text-cyan-300">Top ribbon:</span> Learned features (exon/intron boundaries, TF motifs). 
                    <span className="font-medium text-purple-300">Bottom chart:</span> Δ likelihood around variant.
                  </p>
                  <OracleExplainTrack {...vp.components.primary.config} />
                  <div className="mt-4 p-3 bg-green-900/20 border border-green-700/50 rounded">
                    <div className="text-xs text-green-300 font-semibold mb-1">Construct Risk Assessment:</div>
                    <div className="text-xs text-green-200">
                      ✓ Exon boundary preserved<br/>
                      ✓ CTCF motif intact<br/>
                      ⚠ Moderate likelihood impact (-0.8)
                    </div>
                  </div>
                </div>
              )}
              


              {vp.components?.primary?.type === 'guidedDesign' && (
                <div className="space-y-4">
                  <GuidedDesignPanel {...vp.components.primary.config} />
                  {vp.components?.secondary && Array.isArray(vp.components.secondary) && vp.components.secondary.length > 0 && vp.components.secondary[0].type === 'sequencePeaks' && (
                    <SequencePeaksViewer {...vp.components.secondary[0].config} />
                  )}
                </div>
              )}

              {/* Enhanced Multi-Modal Components */}
              {vp.components?.primary && ['geneEssentiality', 'proteinFunctionalChange', 'chromatinAccessibility'].includes(vp.components.primary.type) && (
                <div>
                  {renderContextualComponent(vp.components.primary as ComponentConfig)}
                </div>
              )}

              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Business Impact</h4>
                <div className="space-y-2 text-sm">
                  {vp.impact.map((impact, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-slate-300">{impact.label}:</span>
                      <span className="text-green-400 font-semibold">{impact.before} → {impact.after}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Total Business Impact */}
      <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-700/50 rounded-xl p-8">
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold text-green-300">{summary.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {summary.metrics.map((metric, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-green-400">{metric.value}</div>
                <div className="text-green-300">{metric.label}</div>
                <div className="text-xs text-green-400 mt-1">{metric.subtitle}</div>
              </div>
            ))}
          </div>
          <p className="text-green-200 max-w-4xl mx-auto text-lg">
            {summary.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BusinessTransformation; 