import React, { useState } from 'react';
import { OracleScore, GuidedDesignPanel, SequencePeaksViewer, OracleExplainTrack, IndustryProblemShowcase, FactoryDemoShowcase } from './';
import { renderContextualComponent } from '../../../utils/componentRenderer';
import { discriminativeAIContent } from '../../../data/discriminativeAIContent';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
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
      {/* Industry Problem */}
    
      {/* Value Propositions */}
      {valuePropositions.map((vp, index) => {
        // Get contextual demo for this value proposition using factory approach
        const getDemoForVP = (title: string): { type: 'factory' | 'legacy'; category?: string; scenario?: string; demo?: string } => {
          if (title.toLowerCase().includes('triage') || title.toLowerCase().includes('variants')) {
            return { type: 'factory' as const, category: 'biotechRnD', scenario: 'variantTriaging' };
          } else if (title.toLowerCase().includes('constructs') || title.toLowerCase().includes('evidence')) {
            return { type: 'factory' as const, category: 'biotechRnD', scenario: 'constructPrioritization' };
          } else if (title.toLowerCase().includes('guide') || title.toLowerCase().includes('design')) {
            return { type: 'factory' as const, category: 'biotechRnD', scenario: 'guidedSequenceGeneration' };
          }
          return { type: 'legacy' as const, demo: 'brca1Analysis' };
        };

        return (
          <div key={index} className="space-y-6">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold text-white">{vp.title}</h3>
              <p className="text-xl text-slate-300 max-w-4xl mx-auto">{vp.description}</p>
            </div>

            {/* Oracle Demo Showcase */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8 space-y-6">
              <div className="text-center space-y-2">
                <h4 className="text-xl font-semibold text-green-300">
                  🧬 {productName} Annihilation of Uncertainty
                </h4>
                <p className="text-slate-400 text-sm">
                  Click "Run Demo" to see Oracle solve this problem step-by-step with discriminative AI endpoints
                </p>
              </div>
              <FactoryDemoShowcase demoConfig={getDemoForVP(vp.title)} />
            </div>
          </div>
        );
      })}

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