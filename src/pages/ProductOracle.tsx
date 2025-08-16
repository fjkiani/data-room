import React from 'react';
import { OracleExplainTrack, VEPMetrics, VariantDetailCard, EssentialityChart, AccessibilityTrack, ProteinDeltaCard, KPIStrip } from '../components/site/blocks';
import { OracleScore, ProcessStepper } from '../components/site/blocks';
import { oracleContent } from '../data/oracleContent';

const ProductOracle: React.FC = () => {
  // Process steps for Oracle workflow
  const processSteps = [
    { 
      title: 'Ingest Variant', 
      description: '8,192 nt window with single-nucleotide resolution',
      accent: 'cyan' as const
    },
    { 
      title: 'Zero-Shot Prediction', 
      description: 'Evo2 likelihood scoring without task-specific training',
      accent: 'purple' as const
    },
    { 
      title: 'Clinical Verdict', 
      description: 'Calibrated pathogenicity with explainable evidence',
      accent: 'orange' as const
    },
  ];



  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-white">Oracle</h1>
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            {oracleContent.about.oneLiner}
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-400">
            {oracleContent.about.evo2Context.map((context, i) => (
              <span key={i} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full font-medium text-slate-200">
                {context}
              </span>
            ))}
          </div>
        </section>

        {/* Process Flow */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold text-white">Zero-Shot Prediction Pipeline</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              {oracleContent.about.purpose}
            </p>
          </div>
          <ProcessStepper steps={processSteps} />
        </section>

        {/* Oracle in Action - Demonstration */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold text-white">Oracle in Action</h2>
            <p className="text-lg text-slate-300">
              From uncertain variants to clinical verdicts with explainable evidence
            </p>
          </div>
          
          <OracleScore
            left={{ title: 'Traditional Verdict', value: 'VUS', subtitle: '(Uncertain)' }}
            right={{ title: 'Oracle Verdict', value: 'Pathogenic', subtitle: '(Actionable)' }}
            score={{ title: 'Zeta Score (Functional Damage)', value: '-26140.8' }}
          />
        </section>

        {/* Variant Impact Analysis */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold text-white">Variant Impact Analysis</h2>
            <p className="text-lg text-slate-300">
              Deep sequence understanding with mechanistic interpretability
            </p>
          </div>
          
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">Oracle Explain Track</h3>
              <p className="text-sm text-slate-300">
                <span className="font-medium text-cyan-300">Top ribbon:</span> Learned features (exon/intron boundaries, TF motifs) from SAE interpretability. 
                <span className="font-medium text-purple-300 ml-4">Bottom chart:</span> Δ likelihood around the variant position.
              </p>
            </div>
            <OracleExplainTrack {...oracleContent.explain} />
          </div>
          
          <VEPMetrics {...oracleContent.vepMetrics} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <VariantDetailCard 
              id={oracleContent.useCases.hereditaryBreastCancer.examples[0].id} 
              region={oracleContent.useCases.hereditaryBreastCancer.examples[0].region as any} 
              zeroShot={oracleContent.useCases.hereditaryBreastCancer.examples[0].zeroShot} 
              verdict={oracleContent.useCases.hereditaryBreastCancer.examples[0].verdict as any} 
              notes={oracleContent.useCases.hereditaryBreastCancer.examples[0].notes} 
            />
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
              <KPIStrip items={[
                { label: '% VUS resolved', value: `${Math.round(oracleContent.performanceMetrics.vusResolutionRate * 100)}%` }, 
                { label: 'ECE', value: oracleContent.calibration.ece.toFixed(3) }, 
                { label: 'Mean confidence', value: oracleContent.performanceMetrics.meanConfidence.toFixed(2) }, 
                { label: 'Cohort size', value: oracleContent.performanceMetrics.cohortSize.toLocaleString() }
              ]} />
              <div className="mt-4 text-xs text-slate-400">
                <div>VUS resolution based on ClinVar non-coding improvement</div>
                <div>Cohort: Combined ClinVar + BRCA1/2 + SpliceVarDB studies</div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Modal Predictions */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-white text-center">Multi-Modal Biological Predictions</h2>
          <p className="text-lg text-slate-300 text-center max-w-4xl mx-auto">
            Oracle provides comprehensive biological insights across multiple modalities with context-specific business value
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                              <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Gene Essentiality by Context</h3>
                  <EssentialityChart series={oracleContent?.essentialitySeries || [
                    { context: { cellLine: 'A549', mutations: ['TP53', 'KEAP1'] }, score: 0.82 },
                    { context: { cellLine: 'MCF7', mutations: ['PIK3CA'] }, score: 0.67 }
                  ]} />
                </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Chromatin Accessibility</h3>
                <AccessibilityTrack tracks={oracleContent.accessibilityTracks as any} />
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Protein Functional Change</h3>
                <ProteinDeltaCard {...oracleContent.proteinDelta as any} />
              </div>

          {/* Context-Aware Multi-Modal Examples */}
          <div className="mt-12 p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
              See These Components in Action Across Industries
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">🧬 Biotech R&D Context</h4>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• Gene Essentiality → Target Prioritization (90% vs 15% success)</li>
                  <li>• Protein Function → Therapeutic Optimization (100x binding)</li>
                  <li>• Chromatin Access → Enhancer Design (100x specificity)</li>
                </ul>
                <a href="/site/biotech-transformation" className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block">
                  → See Full Biotech Transformation
                </a>
              </div>
              <div className="p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">🏥 Clinical Context</h4>
                <ul className="text-sm text-green-200 space-y-1">
                  <li>• Gene Essentiality → Tumor Selectivity (50x therapeutic window)</li>
                  <li>• Protein Function → Resistance Prediction (6 months early)</li>
                  <li>• Chromatin Access → Regulatory VUS (85% resolved)</li>
                </ul>
                <a href="/site/clinical-transformation" className="text-xs text-green-400 hover:text-green-300 mt-2 inline-block">
                  → See Full Clinical Transformation
                </a>
              </div>
            </div>
          </div>
              
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Use Cases</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-200 mb-2">Hereditary Breast Cancer</h4>
                    <div className="text-sm text-slate-300">
                      Panel: {oracleContent.useCases.hereditaryBreastCancer.panel.join(', ')}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-200 mb-2">Newborn Screening</h4>
                    <div className="text-sm text-slate-300">
                      Panels: {oracleContent.useCases.newbornScreening.panels.join(', ')}
                    </div>
                    <div className="text-sm text-slate-400">
                      Throughput: {oracleContent.useCases.newbornScreening.throughput.variantsPerHour.toLocaleString()} variants/hour
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scientific Validation - Enhanced */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold text-white">Scientific Validation</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              State-of-the-art performance across the most challenging clinical prediction tasks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ClinVar - Highlighted as primary achievement */}
            <div className="p-6 rounded-xl border border-cyan-700/50 bg-gradient-to-br from-cyan-900/30 to-cyan-800/30">
              <div className="font-bold text-cyan-300 mb-3 text-lg">ClinVar (Zero-Shot)</div>
              <div className="space-y-2 text-cyan-200">
                <div>All SNV AUROC: <span className="font-semibold">{oracleContent.evo2Benchmarks.clinVar.allSNV.auroc}</span></div>
                <div>All non-SNV AUROC: <span className="font-semibold">{oracleContent.evo2Benchmarks.clinVar.allNonSNV.auroc}</span></div>
              </div>
              <div className="text-cyan-400 mt-3 text-xs">{oracleContent.evo2Benchmarks.clinVar.notes}</div>
            </div>

            {/* BRCA - Clinical relevance */}
            <div className="p-6 rounded-xl border border-purple-700/50 bg-gradient-to-br from-purple-900/30 to-purple-800/30">
              <div className="font-bold text-purple-300 mb-3 text-lg">BRCA1/2</div>
              <div className="space-y-2 text-purple-200">
                <div>BRCA1 Supervised AUROC: <span className="font-semibold">{oracleContent.evo2Benchmarks.brca.supervisedBRCA1.auroc}</span></div>
                <div>AUPRC: <span className="font-semibold">{oracleContent.evo2Benchmarks.brca.supervisedBRCA1.auprc}</span></div>
              </div>
              <div className="text-purple-400 mt-3 text-xs">{oracleContent.evo2Benchmarks.brca.notes}</div>
            </div>

            {/* SpliceVarDB */}
            <div className="p-6 rounded-xl border border-slate-600 bg-slate-800">
              <div className="font-bold text-white mb-3 text-lg">SpliceVarDB</div>
              <div className="space-y-2 text-slate-200">
                <div>All AUROC: <span className="font-semibold">{oracleContent.evo2Benchmarks.spliceVarDB.all.auroc}</span></div>
              </div>
              <div className="text-slate-400 mt-3 text-xs">{oracleContent.evo2Benchmarks.spliceVarDB.notes}</div>
            </div>

            {/* Exon/Intron Classifier */}
            <div className="p-6 rounded-xl border border-slate-600 bg-slate-800">
              <div className="font-bold text-white mb-3 text-lg">Exon/Intron Classifier</div>
              <div className="space-y-2 text-slate-200">
                <div>AUROC range: <span className="font-semibold">{oracleContent.evo2Benchmarks.exonIntronClassifier.aurocRange[0]}–{oracleContent.evo2Benchmarks.exonIntronClassifier.aurocRange[1]}</span></div>
              </div>
              <div className="text-slate-400 mt-3 text-xs">{oracleContent.evo2Benchmarks.exonIntronClassifier.notes}</div>
            </div>

            {/* Long-context retrieval */}
            <div className="p-6 rounded-xl border border-slate-600 bg-slate-800">
              <div className="font-bold text-white mb-3 text-lg">Long-Context Retrieval</div>
              <div className="space-y-2 text-slate-200">
                <div>Up to 1M tokens</div>
                <div>Threshold r ≥ <span className="font-semibold">{oracleContent.evo2Benchmarks.retrievalLongContext.thresholdR}</span></div>
              </div>
            </div>

            {/* mRNA decay */}
            <div className="p-6 rounded-xl border border-slate-600 bg-slate-800">
              <div className="font-bold text-white mb-3 text-lg">mRNA Decay</div>
              <div className="space-y-2 text-slate-200">
                <div>Correlation: <span className="font-semibold">{oracleContent.evo2Benchmarks.mRnaDecay.correlation}</span></div>
              </div>
              <div className="text-slate-400 mt-3 text-xs">{oracleContent.evo2Benchmarks.mRnaDecay.notes}</div>
            </div>
          </div>
        </section>

        {/* See How Oracle is Transforming Industries */}
        <section className="py-16 px-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">See How Oracle is Transforming Industries</h2>
              <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                Dive deep into specific industry transformations and see the complete workflow revolution
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Biotech R&D Transformation */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-colors group">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-2xl">
                      🧬
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Biotech R&D Transformation</h3>
                      <p className="text-slate-300">From 90% failure to predictable success</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">96%</div>
                      <div className="text-xs text-slate-400">Cost reduction</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">36x</div>
                      <div className="text-xs text-slate-400">Faster discovery</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">73%</div>
                      <div className="text-xs text-slate-400">Success rate</div>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-sm">
                    See how Oracle eliminates guesswork in therapeutic development with variant triaging, 
                    explainable evidence, and guided sequence generation.
                  </p>
                  
                  <a 
                    href="/site/biotech-transformation" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors group-hover:bg-blue-500"
                  >
                    Explore Biotech Transformation
                    <span className="text-lg">→</span>
                  </a>
                </div>
              </div>

              {/* Clinical Oncology Transformation */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 hover:border-green-500/50 transition-colors group">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-2xl">
                      🏥
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Clinical Oncology Transformation</h3>
                      <p className="text-slate-300">From VUS uncertainty to precision medicine</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400">73%</div>
                      <div className="text-xs text-slate-400">VUS resolved</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">12x</div>
                      <div className="text-xs text-slate-400">Faster decisions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">+40%</div>
                      <div className="text-xs text-slate-400">Better outcomes</div>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-sm">
                    Discover how Oracle revolutionizes patient care with instant VUS resolution, 
                    resistance prediction, and personalized immunotherapy design.
                  </p>
                  
                  <a 
                    href="/site/clinical-transformation" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-colors group-hover:bg-green-500"
                  >
                    Explore Clinical Transformation
                    <span className="text-lg">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductOracle; 
 
 

