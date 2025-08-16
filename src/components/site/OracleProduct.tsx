import React from 'react';
import { ProductPageLayout, ProductHero, ProductSection } from './ProductPageLayout';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { OracleExplainTrack, VEPMetrics, VariantDetailCard, EssentialityChart, AccessibilityTrack, ProteinDeltaCard, KPIStrip, CrisprEfficacyCard, VariantImpactLandscape, DiscriminativeAIShowcase } from './blocks';
import { OracleScore, ProcessStepper } from './blocks';

interface OracleProductProps {
  content: {
    title: string;
    subtitle: string;
    badge: {
      icon: string;
      text: string;
      color: string;
    };
    metrics: Array<{
      value: string;
      label: string;
      description: string;
    }>;
    contextTags: string[];
    processSteps: Array<{
      title: string;
      description: string;
      accent: 'cyan' | 'purple' | 'orange';
    }>;
    oracleScore: {
      left: { title: string; value: string; subtitle: string };
      right: { title: string; value: string; subtitle: string };
      score: { title: string; value: string };
    };
    explainTrack: any;
    vepMetrics: any;
    variantDetail: any;
    performanceMetrics: Array<{
      label: string;
      value: string;
    }>;
    multiModal: {
      essentialitySeries: any[];
      accessibilityTracks: any;
      proteinDelta: any;
    };
    validation: any;
    transformations: Array<{
      id: string;
      title: string;
      subtitle: string;
      icon: string;
      color: string;
      metrics: Array<{ label: string; value: string }>;
      description: string;
      href: string;
      buttonText: string;
    }>;
  };
}

const OracleProduct: React.FC<OracleProductProps> = ({ content }) => {
  const { getTextSize } = useAccessibility();

  return (
    <ProductPageLayout>
      {/* Hero Section */}
      <ProductHero
        title={content.title}
        subtitle={content.subtitle}
        badge={content.badge}
        metrics={content.metrics}
        contextTags={content.contextTags}
      />

      {/* Process Flow */}
      <ProductSection
        title="Zero-Shot Prediction Pipeline"
        subtitle="Resolve uncertainty with quantitative, zero-shot predictions."
      >
        <ProcessStepper steps={content.processSteps} />
      </ProductSection>

      {/* Oracle in Action */}
      <ProductSection
        title="Oracle in Action"
        subtitle="From uncertain variants to clinical verdicts with explainable evidence. See how Oracle resolves VUS into quantitative, defensible decisions."
      >
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-slate-600 rounded-2xl p-8">
          <OracleScore {...content.oracleScore} />
          
          {/* 101 Doc Context */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
              <div className={`font-bold text-cyan-400 mb-2 ${getTextSize('text-3xl')}`}>Validated Target</div>
              <div className={`text-slate-200 ${getTextSize('text-lg')}`}>Quantitative verdict with confidence</div>
            </div>
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
              <div className={`font-bold text-cyan-400 mb-2 ${getTextSize('text-3xl')}`}>Defensible Score</div>
              <div className={`text-slate-200 ${getTextSize('text-lg')}`}>Suitable for regulatory evidence</div>
            </div>
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
              <div className={`font-bold text-cyan-400 mb-2 ${getTextSize('text-3xl')}`}>Unblocks Decisions</div>
              <div className={`text-slate-200 ${getTextSize('text-lg')}`}>Eliminates wrong-target spend</div>
            </div>
          </div>
        </div>
      </ProductSection>

      {/* Variant Impact Analysis */}
      <ProductSection
        title="Variant Impact Analysis"
        subtitle="Deep sequence understanding with mechanistic interpretability. Oracle computes the Zeta Score (functional damage) for any variant, including unseen ones, with AUROC > 0.95 for hard variants."
      >
        <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8">
          <div className="mb-8 space-y-6">
            <h3 className={`font-bold text-white ${getTextSize('text-3xl')}`}>Oracle Explain Track</h3>
            
            <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-6">
              <h4 className={`font-bold text-cyan-300 mb-4 flex items-center gap-3 ${getTextSize('text-xl')}`}>
                🧠 Sparse Autoencoder Features (32,768 learned concepts)
              </h4>
              <p className={`text-slate-200 leading-relaxed ${getTextSize('text-lg')}`}>
                <span className="font-bold text-cyan-300">Top ribbon:</span> Shows activation of 32,768 biological features learned by Evo2's layer 26 
                through mechanistic interpretability. Each feature represents specific biological concepts discovered without supervision—
                exon-intron boundaries, transcription factor motifs, protein structural elements, and prophage regions.
              </p>
            </div>
            
            <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-6">
              <h4 className={`font-bold text-purple-300 mb-4 flex items-center gap-3 ${getTextSize('text-xl')}`}>
                📊 Discriminative Likelihood Analysis
              </h4>
              <p className={`text-slate-200 leading-relaxed ${getTextSize('text-lg')}`}>
                <span className="font-bold text-purple-300">Bottom chart:</span> Δ likelihood around the variant position shows how the mutation 
                changes Evo2's prediction confidence across the genomic window. Negative values indicate functional disruption, 
                enabling zero-shot pathogenicity prediction with 95.7% AUROC.
              </p>
            </div>
          </div>
          
          <OracleExplainTrack {...content.explainTrack} />
          
          <div className="mt-6 p-6 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border border-cyan-600/50 rounded-xl">
            <div className={`text-cyan-200 font-bold mb-3 ${getTextSize('text-lg')}`}>Example Analysis - BRCA1:c.123A&gt;T:</div>
            <div className={`text-slate-100 space-y-2 ${getTextSize('text-base')}`}>
              <div>🎯 <span className="text-cyan-300 font-semibold">SAE Features:</span> Exon boundary preserved, CTCF motif intact</div>
              <div>📈 <span className="text-purple-300 font-semibold">Likelihood Impact:</span> Moderate disruption (-0.8 Δ likelihood)</div>
              <div>🔮 <span className="text-orange-300 font-semibold">Zero-shot Verdict:</span> Pathogenic (AUROC: 0.957)</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VariantDetailCard {...content.variantDetail} />
          <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8">
            <h3 className={`font-bold text-white mb-6 text-center ${getTextSize('text-3xl')}`}>Discriminative AI Performance</h3>
            <KPIStrip items={content.performanceMetrics} />
            <div className={`mt-6 text-slate-300 text-center leading-relaxed space-y-2 ${getTextSize('text-base')}`}>
              <div className={`font-semibold text-slate-200 ${getTextSize('text-base')}`}>Performance validated across multiple benchmarks:</div>
              <div>VUS resolution based on ClinVar non-coding improvement</div>
              <div>Cohort: Combined ClinVar + BRCA1/2 + SpliceVarDB studies</div>
            </div>
          </div>
        </div>
      </ProductSection>

      {/* Multi-Modal Predictions */}
      <ProductSection
        title="Multi-Modal Biological Predictions"
        subtitle="Oracle provides comprehensive biological insights across multiple modalities. From gene essentiality to protein functional changes to chromatin accessibility—all with context-specific business value for biotech R&D, clinical oncology, and genetic testing labs."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
              <h3 className={`font-bold text-white mb-6 ${getTextSize('text-3xl')}`}>Gene Essentiality by Context</h3>
              <p className={`text-slate-300 mb-6 leading-relaxed ${getTextSize('text-lg')}`}>
                Context-dependent gene essentiality predictions across different cell lines and mutation backgrounds. 
                Critical for target prioritization and therapeutic window assessment.
              </p>
              <EssentialityChart series={content.multiModal.essentialitySeries} />
            </div>
            
            <div className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
              <h3 className={`font-bold text-white mb-6 ${getTextSize('text-3xl')}`}>Chromatin Accessibility</h3>
              <p className={`text-slate-300 mb-6 leading-relaxed ${getTextSize('text-lg')}`}>
                Epigenomic predictions showing how variants affect chromatin structure and accessibility. 
                Essential for understanding regulatory impacts and designing epigenetic therapies.
              </p>
              <AccessibilityTrack tracks={content.multiModal.accessibilityTracks} />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
              <h3 className={`font-bold text-white mb-6 ${getTextSize('text-3xl')}`}>Protein Functional Change</h3>
              <p className={`text-slate-300 mb-6 leading-relaxed ${getTextSize('text-lg')}`}>
                Quantitative predictions of how variants affect protein function, stability, and folding. 
                Enables precise assessment of therapeutic targets and resistance mechanisms.
              </p>
              <ProteinDeltaCard {...content.multiModal.proteinDelta} />
            </div>
          </div>
        </div>
      </ProductSection>

      {/* Complete Discriminative AI Arsenal */}
      <ProductSection
        title="Complete Discriminative AI Arsenal"
        subtitle="Explore all 5 discriminative AI endpoints that power Oracle's zero-shot predictions. Each endpoint addresses specific biological questions with state-of-the-art accuracy, from variant pathogenicity to CRISPR guide design."
      >
        <DiscriminativeAIShowcase selectedEndpoint="variantImpact" showUseCases={true} interactive={true} />
      </ProductSection>

      {/* Real-World Case Studies */}
      <ProductSection
        title="Real-World Case Studies"
        subtitle="See Oracle's discriminative AI in action with specific genomic targets and therapeutic scenarios. These case studies demonstrate how variant impact and CRISPR efficacy predictions work together for precision medicine."
      >
        <div className="space-y-12">
          {/* Row 1: Variant Impact + CRISPR Efficacy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <VariantImpactLandscape
              locus="chr17:43044000-43052000"
              windowSize={8000}
              variants={[
                {
                  position: 43044295,
                  ref: 'A',
                  alt: 'T',
                  deltaLikelihood: -2.34,
                  pathogenicity: 'Pathogenic',
                  confidence: 0.94,
                  consequence: 'missense_variant',
                  gene: 'BRCA1'
                },
                {
                  position: 43045123,
                  ref: 'G',
                  alt: 'C',
                  deltaLikelihood: -1.87,
                  pathogenicity: 'Pathogenic',
                  confidence: 0.89,
                  consequence: 'splice_donor_variant',
                  gene: 'BRCA1'
                },
                {
                  position: 43047456,
                  ref: 'T',
                  alt: 'G',
                  deltaLikelihood: -2.91,
                  pathogenicity: 'Pathogenic',
                  confidence: 0.96,
                  consequence: 'frameshift_variant',
                  gene: 'BRCA1'
                }
              ]}
              regions={[
                { start: 43044200, end: 43044400, type: 'exon', name: 'Exon 2' },
                { start: 43044400, end: 43045000, type: 'intron', name: 'Intron 2' },
                { start: 43045000, end: 43045200, type: 'exon', name: 'Exon 3' },
                { start: 43045200, end: 43046800, type: 'intron', name: 'Intron 3' },
                { start: 43046800, end: 43047000, type: 'exon', name: 'Exon 4' },
                { start: 43047000, end: 43048000, type: 'intron', name: 'Intron 4' }
              ]}
              metrics={{
                totalVariants: 8,
                pathogenicCount: 4,
                vusResolved: 3,
                avgConfidence: 0.91
              }}
            />

            <CrisprEfficacyCard 
              targetGene="KRAS"
              targetLocus="chr12:25245350-25245370"
              guides={[
                {
                  sequence: 'GACGGAGGCTAAGCGTCGCAA',
                  efficacy: 0.92,
                  frameshift: 0.89,
                  pam: 'CGG',
                  position: 25245355
                },
                {
                  sequence: 'CTAAGCGTCGCAACGGAGCTT',
                  efficacy: 0.87,
                  frameshift: 0.84,
                  pam: 'TGG',
                  position: 25245362
                },
                {
                  sequence: 'AAGCGTCGCAACGGAGCTTAG',
                  efficacy: 0.83,
                  frameshift: 0.91,
                  pam: 'AGG',
                  position: 25245368
                }
              ]}
              metrics={{
                avgEfficacy: 0.87,
                topGuideScore: 0.92,
                frameshiftRate: 0.88
              }}
            />
          </div>

          {/* Case Study: KRAS G12C Therapeutic Design */}
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-slate-600 rounded-2xl p-8">
            <div className="mb-8">
              <h3 className={`font-bold text-white mb-4 ${getTextSize('text-3xl')}`}>🎯 Case Study: KRAS G12C Therapeutic Design</h3>
              <p className={`text-slate-300 leading-relaxed ${getTextSize('text-lg')}`}>
                Complete workflow from variant identification to CRISPR therapeutic design. This case study demonstrates how Oracle's 
                variant impact and CRISPR efficacy predictions work together to design precision oncology interventions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className={`font-semibold text-blue-400 mb-4 ${getTextSize('text-xl')}`}>Step 1: Variant Impact Assessment</h4>
                <VariantImpactLandscape
                  locus="chr12:25245300-25245400"
                  windowSize={100}
                  variants={[
                    {
                      position: 25245350,
                      ref: 'G',
                      alt: 'T',
                      deltaLikelihood: -3.12,
                      pathogenicity: 'Pathogenic',
                      confidence: 0.96,
                      consequence: 'missense_variant',
                      gene: 'KRAS'
                    }
                  ]}
                  regions={[
                    { start: 25245300, end: 25245400, type: 'exon', name: 'KRAS Exon 2' }
                  ]}
                  metrics={{
                    totalVariants: 1,
                    pathogenicCount: 1,
                    vusResolved: 0,
                    avgConfidence: 0.96
                  }}
                />
              </div>
              
              <div>
                <h4 className={`font-semibold text-green-400 mb-4 ${getTextSize('text-xl')}`}>Step 2: CRISPR Guide Design</h4>
                <CrisprEfficacyCard 
                  targetGene="KRAS"
                  targetLocus="chr12:25245350-25245370"
                  guides={[
                    {
                      sequence: 'GACGGAGGCTAAGCGTCGCAA',
                      efficacy: 0.92,
                      frameshift: 0.89,
                      pam: 'CGG',
                      position: 25245355
                    },
                    {
                      sequence: 'CTAAGCGTCGCAACGGAGCTT',
                      efficacy: 0.87,
                      frameshift: 0.84,
                      pam: 'TGG',
                      position: 25245362
                    }
                  ]}
                  metrics={{
                    avgEfficacy: 0.90,
                    topGuideScore: 0.92,
                    frameshiftRate: 0.87
                  }}
                />
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-slate-700/30 border border-slate-600 rounded-xl">
              <h4 className={`font-semibold text-yellow-400 mb-4 ${getTextSize('text-xl')}`}>🏆 Therapeutic Outcome</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`font-bold text-green-400 ${getTextSize('text-2xl')}`}>96%</div>
                  <div className={`text-slate-300 ${getTextSize('text-sm')}`}>Variant confidence</div>
                  <div className={`text-slate-400 ${getTextSize('text-xs')}`}>High-confidence pathogenic</div>
                </div>
                <div className="text-center">
                  <div className={`font-bold text-blue-400 ${getTextSize('text-2xl')}`}>92%</div>
                  <div className={`text-slate-300 ${getTextSize('text-sm')}`}>Guide efficacy</div>
                  <div className={`text-slate-400 ${getTextSize('text-xs')}`}>Optimal cutting efficiency</div>
                </div>
                <div className="text-center">
                  <div className={`font-bold text-purple-400 ${getTextSize('text-2xl')}`}>87%</div>
                  <div className={`text-slate-300 ${getTextSize('text-sm')}`}>Frameshift rate</div>
                  <div className={`text-slate-400 ${getTextSize('text-xs')}`}>Functional knockout</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProductSection>

      {/* Scientific Validation */}
      <ProductSection
        title="Scientific Validation"
        subtitle="State-of-the-art performance across the most challenging clinical prediction tasks. Oracle achieves superior results on ClinVar, BRCA1/2, and SpliceVarDB—the gold-standard benchmarks that define variant prediction excellence."
      >
        <VEPMetrics {...content.validation} />
      </ProductSection>

      {/* Industry Transformations CTA */}
      <section className="py-20 px-8 bg-gradient-to-r from-slate-800/60 to-slate-700/60 rounded-3xl">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-8">
            <h2 className={`font-bold text-white ${getTextSize('text-6xl')}`}>See How Oracle is Transforming Industries</h2>
            <p className={`text-slate-200 max-w-5xl mx-auto leading-relaxed font-medium ${getTextSize('text-3xl')}`}>
              Dive deep into specific industry transformations and see the complete workflow revolution. 
              From 90% failure rates to predictable success across biotech, clinical, and genetic testing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {content.transformations.map((transformation) => {
              const colorClasses = {
                blue: {
                  border: 'hover:border-blue-500/50',
                  bg: 'bg-blue-600',
                  hover: 'hover:bg-blue-500',
                  text: 'text-blue-400',
                  groupHover: 'group-hover:bg-blue-500'
                },
                green: {
                  border: 'hover:border-green-500/50',
                  bg: 'bg-green-600',
                  hover: 'hover:bg-green-500',
                  text: 'text-green-400',
                  groupHover: 'group-hover:bg-green-500'
                },
                purple: {
                  border: 'hover:border-purple-500/50',
                  bg: 'bg-purple-600',
                  hover: 'hover:bg-purple-500',
                  text: 'text-purple-400',
                  groupHover: 'group-hover:bg-purple-500'
                }
              }[transformation.color] || {
                border: 'hover:border-blue-500/50',
                bg: 'bg-blue-600',
                hover: 'hover:bg-blue-500',
                text: 'text-blue-400',
                groupHover: 'group-hover:bg-blue-500'
              };

              return (
                <div key={transformation.id} className={`bg-slate-800 border border-slate-700 rounded-xl p-8 ${colorClasses.border} transition-colors group`}>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center text-2xl`}>
                        {transformation.icon}
                      </div>
                      <div>
                        <h3 className={`font-bold text-white ${getTextSize('text-2xl')}`}>{transformation.title}</h3>
                        <p className={`text-slate-300 ${getTextSize('text-base')}`}>{transformation.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {transformation.metrics.map((metric, i) => (
                        <div key={i}>
                          <div className={`font-bold ${colorClasses.text} ${getTextSize('text-2xl')}`}>{metric.value}</div>
                          <div className={`text-slate-400 ${getTextSize('text-xs')}`}>{metric.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    <p className={`text-slate-300 ${getTextSize('text-sm')}`}>
                      {transformation.description}
                    </p>
                    
                    <a 
                      href={transformation.href}
                      className={`inline-flex items-center gap-2 px-6 py-3 ${colorClasses.bg} ${colorClasses.hover} text-white rounded-lg font-semibold transition-colors ${colorClasses.groupHover}`}
                    >
                      {transformation.buttonText}
                      <span className="text-lg">→</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </ProductPageLayout>
  );
};

export default OracleProduct; 