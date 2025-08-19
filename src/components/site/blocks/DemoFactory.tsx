import React, { useState } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import { Play, Pause, RotateCcw, ChevronRight, Activity, Target, Dna, Scissors, Zap, ShieldCheck } from 'lucide-react';
import EnhancedDossierSummary from './EnhancedDossierSummary';
import { getDossierByAPI } from '../../../data/dossierSummaries';

interface APIDemo {
  id: string;
  name: string;
  endpoint: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  capabilities: string[];
  useCases: {
    title: string;
    description: string;
    examples: string[];
  }[];
  simulation: {
    input: any;
    steps: {
      title: string;
      description: string;
      duration: number;
      output?: any;
    }[];
    finalOutput: any;
  };
}

const demoAPIs: APIDemo[] = [
  {
    id: 'variant_impact',
    name: 'Variant Impact Prediction',
    endpoint: '/predict_variant_impact',
    icon: <Target className="w-6 h-6" />,
    color: 'blue',
    description: 'Predicts functional and clinical impact of genetic variants at genome scale',
    capabilities: [
      '95.7% AUROC on ClinVar coding SNVs',
      '95.7% AUROC on ClinVar noncoding SNVs',
      'Zero-shot pathogenicity classification',
      'Mechanistic interpretability features'
    ],
    useCases: [
      {
        title: 'Clinical Diagnostics',
        description: 'Classify variants of uncertain significance (VUS) in patient samples',
        examples: [
          'Identify activating mutations in oncogenes (BRAF V600E, KRAS G12C)',
          'Classify inactivating mutations in tumor suppressors (TP53, RB1)',
          'Analyze mutations in DNA repair genes (BRCA1/2, MMR genes)',
          'Assess TERT promoter mutations'
        ]
      },
      {
        title: 'Population Genomics',
        description: 'Large-scale variant annotation and prioritization',
        examples: [
          'Genome-wide association studies (GWAS)',
          'Rare disease gene discovery',
          'Pharmacogenomics variant analysis'
        ]
      }
    ],
    simulation: {
      input: {
        variant: 'BRCA1:c.5266dupC',
        genomic_position: 'chr17:43044295',
        reference: 'C',
        alternate: 'CC',
        gene: 'BRCA1'
      },
      steps: [
        {
          title: 'Sequence Context Analysis',
          description: 'Analyzing 1024bp genomic window around variant',
          duration: 1500,
        },
        {
          title: 'Evo2 Feature Extraction',
          description: 'Computing 32,768 learned biological features',
          duration: 2000,
          output: {
            features_computed: 32768,
            exon_boundary_score: 0.89,
            tf_binding_disruption: 0.23,
            protein_structure_impact: 0.94
          }
        },
        {
          title: 'Pathogenicity Classification',
          description: 'Zero-shot prediction with confidence calibration',
          duration: 1000,
        }
      ],
      finalOutput: {
        delta_likelihood_score: -2.34,
        pathogenicity_prediction: 'Pathogenic',
        evo2_confidence: 0.94,
        predicted_consequence: 'frameshift_variant',
        feature_disruption_scores: {
          splice_site: 0.12,
          protein_coding: 0.94,
          regulatory: 0.23
        }
      }
    }
  },
  {
    id: 'gene_essentiality',
    name: 'Gene Essentiality Prediction',
    endpoint: '/predict_gene_essentiality',
    icon: <Dna className="w-6 h-6" />,
    color: 'green',
    description: 'Context-aware prediction of gene importance for cell survival and proliferation',
    capabilities: [
      '0.82-0.99 AUROC range across contexts',
      'Cross-species validation (8 species)',
      'Context-specific essentiality scoring',
      'Therapeutic window assessment'
    ],
    useCases: [
      {
        title: 'Drug Target Discovery',
        description: 'Identify genes essential in cancer but not normal cells',
        examples: [
          'Cancer vs normal tissue selectivity analysis',
          'Synthetic lethal relationship discovery',
          'Cell line dependency mapping (DepMap integration)',
          'Target prioritization scoring'
        ]
      },
      {
        title: 'Precision Medicine',
        description: 'Context-dependent therapeutic strategies',
        examples: [
          'Mutation-specific vulnerabilities',
          'Tissue-specific essential genes',
          'Combination therapy targets'
        ]
      }
    ],
    simulation: {
      input: {
        gene: 'KRAS',
        contexts: [
          { cell_line: 'KRAS-mutant NSCLC', mutations: ['KRAS G12C'] },
          { cell_line: 'Normal lung epithelium', mutations: [] },
          { cell_line: 'EGFR-mutant NSCLC', mutations: ['EGFR L858R'] }
        ]
      },
      steps: [
        {
          title: 'Context Encoding',
          description: 'Encoding cellular context and mutation background',
          duration: 1200,
        },
        {
          title: 'Essentiality Computation',
          description: 'Computing context-specific essentiality scores',
          duration: 1800,
        },
        {
          title: 'Therapeutic Window Analysis',
          description: 'Assessing selectivity for therapeutic targeting',
          duration: 1000,
        }
      ],
      finalOutput: {
        essentiality_scores: [
          { context: 'KRAS-mutant NSCLC', score: 0.94, confidence: 0.89 },
          { context: 'Normal lung epithelium', score: 0.08, confidence: 0.92 },
          { context: 'EGFR-mutant NSCLC', score: 0.12, confidence: 0.87 }
        ],
        therapeutic_window: 11.75,
        selectivity_index: 0.86,
        target_priority: 'High'
      }
    }
  },
  {
    id: 'crispr_efficacy',
    name: 'CRISPR Spacer Efficacy',
    endpoint: '/predict_crispr_spacer_efficacy',
    icon: <Scissors className="w-6 h-6" />,
    color: 'purple',
    description: 'Predicts on-target cutting efficiency of CRISPR guide RNAs',
    capabilities: [
      'Efficacy prediction via variant impact simulation',
      'Frameshift probability assessment',
      'Guide RNA optimization',
      'Off-target risk evaluation'
    ],
    useCases: [
      {
        title: 'Therapeutic Development',
        description: 'Design optimal guide RNAs for gene editing therapies',
        examples: [
          'Guide RNA efficacy via frameshift simulation',
          'Prediction method: Variant impact',
          'Off-target: Separate analysis',
          'Optimization for therapeutic applications'
        ]
      },
      {
        title: 'Research Applications',
        description: 'Accelerate CRISPR experimental design',
        examples: [
          'Knockout efficiency prediction',
          'Guide RNA ranking and selection',
          'Experimental success rate improvement'
        ]
      }
    ],
    simulation: {
      input: {
        target_gene: 'BRCA1',
        guide_sequence: 'GTTCCGTGCAAAAGTGTTAG',
        pam_sequence: 'TGG',
        genomic_context: 'chr17:43044295-43044315'
      },
      steps: [
        {
          title: 'Guide RNA Analysis',
          description: 'Analyzing guide RNA sequence and PAM compatibility',
          duration: 1200,
        },
        {
          title: 'Cutting Efficiency Prediction',
          description: 'Simulating variant impact to predict efficacy',
          duration: 1800,
        },
        {
          title: 'Frameshift Assessment',
          description: 'Calculating probability of successful gene knockout',
          duration: 1000,
        }
      ],
      finalOutput: {
        cutting_efficiency: 0.87,
        frameshift_probability: 0.92,
        predicted_outcome: 'High efficacy',
        optimization_score: 0.89,
        alternative_guides: [
          { sequence: 'ATTCCGTGCAAAAGTGTTAG', efficiency: 0.91 },
          { sequence: 'CTTCCGTGCAAAAGTGTTAG', efficiency: 0.84 }
        ]
      }
    }
  },
  {
    id: 'chromatin_accessibility',
    name: 'Chromatin Accessibility Prediction',
    endpoint: '/predict_chromatin_accessibility',
    icon: <Zap className="w-6 h-6" />,
    color: 'orange',
    description: 'Predicts chromatin state and accessibility across genomic regions',
    capabilities: [
      'SAE features activate on TF binding motifs',
      'Tier 2: Integration with Enformer/Borzoi tracks',
      'Regulatory element prediction',
      'Tissue-specific accessibility modeling'
    ],
    useCases: [
      {
        title: 'Regulatory Analysis',
        description: 'Understand gene regulation and chromatin dynamics',
        examples: [
          'TF motif detection: SAE validated',
          'DART-Eval tasks: 12/15 validated',
          'Regulatory elements: Unsupervised',
          'Learned TF binding motifs without supervision'
        ]
      },
      {
        title: 'Drug Development',
        description: 'Target accessible chromatin regions for intervention',
        examples: [
          'Epigenetic drug target identification',
          'Chromatin remodeling predictions',
          'Tissue-specific regulatory analysis'
        ]
      }
    ],
    simulation: {
      input: {
        genomic_region: 'chr1:1000000-1001000',
        cell_type: 'K562',
        tissue_context: 'Hematopoietic',
        tf_of_interest: 'CTCF'
      },
      steps: [
        {
          title: 'Chromatin Context Analysis',
          description: 'Analyzing chromatin state and histone modifications',
          duration: 1500,
        },
        {
          title: 'TF Binding Prediction',
          description: 'Identifying transcription factor binding sites',
          duration: 2000,
        },
        {
          title: 'Accessibility Scoring',
          description: 'Computing accessibility scores across the region',
          duration: 1200,
        }
      ],
      finalOutput: {
        accessibility_score: 0.82,
        chromatin_state: 'Open_Chromatin',
        tf_binding_sites: [
          { tf: 'CTCF', position: 1000456, score: 0.91 },
          { tf: 'YY1', position: 1000789, score: 0.76 }
        ],
        regulatory_elements: [
          { type: 'enhancer', start: 1000200, end: 1000400, strength: 0.85 }
        ],
        tissue_specificity: 0.73
      }
    }
  },
  {
    id: 'protein_functional_change',
    name: 'Protein Functional Change',
    endpoint: '/predict_protein_functional_change',
    icon: <Activity className="w-6 h-6" />,
    color: 'orange',
    description: 'Quantitative predictions of how variants affect protein function, stability, and folding',
    capabilities: [
      'Deep mutational scanning correlation',
      'Protein stability predictions (ΔΔG)',
      'Functional domain impact assessment',
      'Competitive performance vs specialists'
    ],
    useCases: [
      {
        title: 'Drug Discovery',
        description: 'Understand protein function changes for therapeutic targeting',
        examples: [
          'Hotspot mutation functional analysis',
          'Protein stability optimization',
          'Allosteric site identification',
          'Drug resistance mechanism prediction'
        ]
      },
      {
        title: 'Precision Medicine',
        description: 'Predict functional consequences of patient variants',
        examples: [
          'Loss-of-function variant classification',
          'Dominant negative effect prediction',
          'Protein-protein interaction disruption',
          'Therapeutic response prediction'
        ]
      }
    ],
    simulation: {
      input: {
        protein: 'TP53',
        variant: 'R273H',
        genomic_position: 'chr17:7577121',
        amino_acid_change: 'Arg273His'
      },
      steps: [
        {
          title: 'Protein Structure Analysis',
          description: 'Analyzing protein structure and domain organization',
          duration: 1400,
        },
        {
          title: 'Stability Prediction',
          description: 'Computing thermodynamic stability changes (ΔΔG)',
          duration: 1600,
        },
        {
          title: 'Functional Impact Assessment',
          description: 'Evaluating effects on protein function and interactions',
          duration: 1200,
        }
      ],
      finalOutput: {
        stability_change: -2.1,
        functional_score: 0.12,
        domain_impact: 'DNA_binding_domain',
        predicted_effect: 'Loss_of_function',
        confidence: 0.91,
        dms_correlation: 0.89,
        dominant_negative_risk: 0.76
      }
    }
  },
  {
    id: 'splice_impact',
    name: 'Splice Impact Prediction',
    endpoint: '/predict_splice_impact',
    icon: <Activity className="w-6 h-6" />,
    color: 'cyan',
    description: 'Predicts splice motif changes and exon inclusion/exclusion effects',
    capabilities: [
      'Splice site motif scoring',
      'Exon skipping prediction',
      'Junction confidence estimation',
      'Explainable motif impacts'
    ],
    useCases: [
      { title: 'Clinical VUS Resolution', description: 'Clarify splicing consequences of noncoding and intronic variants', examples: ['Exon skipping risk estimation', 'Cryptic splice site activation', 'Splice-gain/splice-loss classification'] }
    ],
    simulation: {
      input: { gene: 'BRCA1', variant: 'c.594-2A>C' },
      steps: [
        { title: 'Splice Site Scoring', description: 'Evaluate canonical/cryptic sites', duration: 900 },
        { title: 'Exon Inclusion Modeling', description: 'Predict inclusion/exclusion', duration: 1200 },
      ],
      finalOutput: { splice_disruption_score: 0.78, predicted_effect: 'Exon_skipping', junction_confidence: 0.86 }
    }
  },
  {
    id: 'drug_target_interaction',
    name: 'Drug–Target Interaction',
    endpoint: '/predict_drug_target_interaction',
    icon: <Target className="w-6 h-6" />,
    color: 'green',
    description: 'Predicts likely therapeutic response based on pathway and variant profile',
    capabilities: ['Mechanism-of-action alignment', 'Biomarker-aware predictions'],
    useCases: [
      { title: 'Precision Oncology', description: 'Drug selection based on genomic drivers', examples: ['KRAS G12C inhibitor sensitivity', 'EGFR pathway inhibitors'] }
    ],
    simulation: {
      input: { alterations: ['KRAS G12C'], context: 'NSCLC' },
      steps: [
        { title: 'Pathway Mapping', description: 'Map drivers to targets', duration: 700 },
        { title: 'MOA Matching', description: 'Align drug MOA to vulnerabilities', duration: 900 }
      ],
      finalOutput: { predicted_response: 'Sensitive', response_score: 0.81 }
    }
  },
  {
    id: 'immunogenicity',
    name: 'Immunogenicity Prediction',
    endpoint: '/predict_immunogenicity',
    icon: <ShieldCheck className="w-6 h-6" />,
    color: 'orange',
    description: 'Predicts immunogenicity risk for designed proteins/edits',
    capabilities: ['Epitope discovery', 'MHC binding estimation'],
    useCases: [
      { title: 'Therapeutic Safety', description: 'Reduce immune risk in gene/protein therapies', examples: ['Deimmunization guidance', 'Hotspot minimization'] }
    ],
    simulation: {
      input: { protein: 'TherapeuticCandidate1' },
      steps: [
        { title: 'Epitope Prediction', description: 'Scan candidate for epitopes', duration: 800 },
        { title: 'MHC Binding', description: 'Estimate common allele binding', duration: 700 }
      ],
      finalOutput: { immunogenicity_risk: 'Moderate', t_cell_epitope_score: 0.44 }
    }
  },
  {
    id: 'generate_optimized_guide_rna',
    name: 'Generate Optimized Guide RNA',
    endpoint: '/generate_optimized_guide_rna',
    icon: <Scissors className="w-6 h-6" />,
    color: 'purple',
    description: 'AI-powered de novo guide RNA design with multi-objective optimization',
    capabilities: ['On/off-target balanced', 'Accessibility-aware design'],
    useCases: [
      { title: 'Therapeutic Editing', description: 'Design guides with strong efficacy and safety', examples: ['BRCA1 knockout design'] }
    ],
    simulation: {
      input: { locus: 'chr17:43044295', pam: 'NGG' },
      steps: [
        { title: 'Candidate Generation', description: 'Enumerate PAM-compatible candidates', duration: 900 },
        { title: 'Multi-Objective Scoring', description: 'Score and rank candidates', duration: 1300 }
      ],
      finalOutput: { guides: [{ sequence: 'GTTCCGTGCAAAAGTGTTAG', composite_score: 0.9 }] }
    }
  },
  {
    id: 'generate_repair_template',
    name: 'Generate Repair Template',
    endpoint: '/generate_repair_template',
    icon: <Activity className="w-6 h-6" />,
    color: 'sky',
    description: 'Design HDR templates with likelihood/QC constraints',
    capabilities: ['Homology arm optimization', 'Repeat/GC constraints'],
    useCases: [ { title: 'Gene Correction', description: 'Precise repair for pathogenic variants', examples: ['BRCA1 correction'] } ],
    simulation: {
      input: { desired_edit: 'restore WT', arm_length: 500 },
      steps: [
        { title: 'HDR Context Modeling', description: 'Assemble homology arms', duration: 1000 },
        { title: 'Likelihood Optimization', description: 'Maximize Evo2 sequence likelihood', duration: 1300 }
      ],
      finalOutput: { templates: [{ sequence: '...AGCT[WT]TGAC...', likelihood: 0.82 }] }
    }
  },
  {
    id: 'generate_therapeutic_protein',
    name: 'Generate Therapeutic Protein',
    endpoint: '/generate_therapeutic_protein_coding_sequence',
    icon: <Activity className="w-6 h-6" />,
    color: 'orange',
    description: 'Design protein candidates and score function/structure',
    capabilities: ['Function predictor + AF3 scoring'],
    useCases: [ { title: 'Biologic Design', description: 'Novel or enhanced proteins', examples: ['Enzyme replacement', 'Binders'] } ],
    simulation: {
      input: { family: 'nanobody', goal: 'PD-L1 binder' },
      steps: [
        { title: 'Codon Optimization', description: 'Optimize for expression', duration: 900 },
        { title: 'Function & Structure Scoring', description: 'Composite rank', duration: 1400 }
      ],
      finalOutput: { candidates: [{ protein: 'MDSK...', function_score: 0.88, structure_score: 0.81 }] }
    }
  },
  {
    id: 'cancer_hallmarks',
    name: 'Analyze Cancer Hallmarks',
    endpoint: '/analyze_cancer_hallmarks',
    icon: <Activity className="w-6 h-6" />,
    color: 'green',
    description: 'Aggregate multi-endpoint outputs into hallmark intelligence',
    capabilities: ['Composite scoring', 'Vulnerability mapping'],
    useCases: [ { title: 'Precision Oncology', description: 'Hallmark-aware tumor profiling', examples: ['KRAS-driven profiles'] } ],
    simulation: {
      input: { sample: 'oncology_case_001' },
      steps: [ { title: 'Aggregation', description: 'Combine discriminative outputs', duration: 1100 }, { title: 'Mapping', description: 'Map to hallmarks', duration: 900 } ],
      finalOutput: { hallmarks: [{ name: 'Sustaining proliferative signaling', score: 0.91 }], vulnerabilities: ['KRAS pathway'] }
    }
  },
  {
    id: 'personalized_therapy',
    name: 'Design Personalized Therapy',
    endpoint: '/design_personalized_therapy',
    icon: <Target className="w-6 h-6" />,
    color: 'blue',
    description: 'End-to-end strategy generation using discriminative + generative endpoints',
    capabilities: ['Target selection', 'Asset generation'],
    useCases: [ { title: 'Clinical Decision Support', description: 'Generate full therapeutic plan', examples: ['KRAS strategy'] } ],
    simulation: {
      input: { tumor_profile: 'oncology_case_001' },
      steps: [ { title: 'Target Selection', description: 'Prioritize actionable targets', duration: 900 }, { title: 'Asset Design', description: 'Design guides/templates', duration: 1400 } ],
      finalOutput: { strategy: { target: 'KRAS G12C', modality: 'Covalent inhibitor + synthetic lethality backup' } }
    }
  }
];

interface DemoFactoryProps {
  selectedAPI?: string;
  onAPISelect?: (apiId: string) => void;
}

const DemoFactory: React.FC<DemoFactoryProps> = ({ selectedAPI, onAPISelect }) => {
  const { getTextSize } = useAccessibility();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [expandedAPI, setExpandedAPI] = useState<string | null>(selectedAPI || null);
  
  // Auto-select the API if provided
  React.useEffect(() => {
    if (selectedAPI && onAPISelect) {
      onAPISelect(selectedAPI);
    }
  }, [selectedAPI, onAPISelect]);

  // Handle URL hash navigation
  React.useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && demoAPIs.find(api => api.id === hash)) {
      setExpandedAPI(hash);
      // Auto-scroll to the API after a short delay
      setTimeout(() => {
        const element = document.getElementById(`api-card-${hash}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, []);

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-600', text: 'text-blue-400', border: 'border-blue-500' },
      green: { bg: 'bg-green-600', text: 'text-green-400', border: 'border-green-500' },
      purple: { bg: 'bg-purple-600', text: 'text-purple-400', border: 'border-purple-500' },
      orange: { bg: 'bg-orange-600', text: 'text-orange-400', border: 'border-orange-500' },
      cyan: { bg: 'bg-cyan-600', text: 'text-cyan-400', border: 'border-cyan-500' }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const runDemo = async (apiId: string) => {
    const api = demoAPIs.find(a => a.id === apiId);
    if (!api) return;

    setActiveDemo(apiId);
    setIsRunning(true);
    setCurrentStep(0);
    setShowResults(false);

    // Auto-scroll to the simulation section
    setTimeout(() => {
      const simulationElement = document.getElementById(`simulation-${apiId}`);
      if (simulationElement) {
        simulationElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);

    // Auto-scroll to the simulation section
    setTimeout(() => {
      const simulationElement = document.getElementById(`simulation-${apiId}`);
      if (simulationElement) {
        simulationElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);

    // Run through simulation steps
    for (let i = 0; i < api.simulation.steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, api.simulation.steps[i].duration));
    }

    setIsRunning(false);
    setShowResults(true);
  };

  const resetDemo = () => {
    setActiveDemo(null);
    setIsRunning(false);
    setCurrentStep(0);
    setShowResults(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}


      {/* API Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {demoAPIs.map((api) => {
          const colors = getColorClasses(api.color);
          const isExpanded = expandedAPI === api.id;
          const isActive = activeDemo === api.id;

          return (
            <div key={api.id} id={`api-card-${api.id}`} className="bg-slate-800 border border-slate-600 rounded-2xl p-8">
              {/* API Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center shadow-lg`}>
                  {api.icon}
                </div>
                <div>
                  <h3 className={`font-bold text-white ${getTextSize('text-2xl')}`}>
                    {api.name}
                  </h3>
                  <p className={`text-slate-400 font-mono ${getTextSize('text-sm')}`}>
                    {api.endpoint}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className={`text-slate-300 mb-6 leading-relaxed ${getTextSize('text-base')}`}>
                {api.description}
              </p>

              {/* Capabilities */}
              <div className="mb-6">
                <h4 className={`font-semibold text-white mb-3 ${getTextSize('text-lg')}`}>
                  Key Capabilities
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {api.capabilities.slice(0, 2).map((capability, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-2 h-2 ${colors.bg} rounded-full shadow-sm`}></div>
                      <span className={`text-slate-300 ${getTextSize('text-sm')}`}>
                        {capability}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo Status Indicator */}
              {isActive && (
                <div className="mb-4">
                  <div className={`flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-${api.color}-900/30 to-${api.color}-800/20 border border-${api.color}-500/30 rounded-lg`}>
                    <div className={`w-2 h-2 ${colors.bg} rounded-full animate-pulse`}></div>
                    <span className={`${colors.text} font-medium ${getTextSize('text-sm')}`}>
                      {isRunning ? '🔄 Demo Running...' : showResults ? '✅ Demo Complete' : '⏳ Demo Ready'}
                    </span>
                  </div>
                </div>
              )}

              {/* Demo Controls - Always Visible */}
              <div className="flex items-center justify-between gap-4 mb-6">
                                  <button
                    onClick={() => {
                      console.log('Demo button clicked for:', api.id);
                      runDemo(api.id);
                    }}
                    disabled={isRunning && isActive}
                    className={`flex items-center gap-2 px-6 py-3 ${colors.bg} hover:opacity-90 disabled:opacity-50 text-white rounded-lg font-semibold transition-all duration-200 ${getTextSize('text-base')} shadow-lg hover:shadow-xl transform hover:scale-105`}
                  >
                    {isRunning && isActive ? (
                      <>
                        <Activity className="w-4 h-4 animate-pulse" />
                        Running Demo...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        🚀 Run Live Demo
                      </>
                    )}
                  </button>
                
                <div className="flex items-center gap-2">
                  {isActive && (
                    <button
                      onClick={resetDemo}
                      className="flex items-center gap-2 px-4 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-semibold transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                  )}
                  
                  <button
                    onClick={() => setExpandedAPI(isExpanded ? null : api.id)}
                    className={`px-4 py-2 rounded-lg border ${colors.border} border-opacity-50 hover:border-opacity-100 transition-all duration-200 ${getTextSize('text-sm')}`}
                  >
                    <span className={`${colors.text}`}>
                      {isExpanded ? '▼ Less' : '▶ More'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Live Demo Simulation */}
              {isActive && (
                <div id={`simulation-${api.id}`} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-6">
                  <h4 className={`font-bold text-white mb-4 ${getTextSize('text-lg')}`}>
                    🔬 Live API Simulation
                  </h4>
                  
                  {/* Input Display */}
                  <div className="mb-4">
                    <h5 className={`font-semibold text-cyan-400 mb-2 ${getTextSize('text-base')}`}>
                      📥 Input Parameters
                    </h5>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-3">
                      <pre className={`text-green-400 font-mono ${getTextSize('text-sm')}`}>
                        {JSON.stringify(api.simulation.input, null, 2)}
                      </pre>
                    </div>
                  </div>

                  {/* Processing Steps */}
                  <div className="mb-4">
                    <h5 className={`font-semibold text-purple-400 mb-2 ${getTextSize('text-base')}`}>
                      ⚡ Processing Steps
                    </h5>
                    <div className="space-y-2">
                      {api.simulation.steps.map((step, i) => (
                        <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${
                          i === currentStep && isRunning 
                            ? 'bg-blue-900/30 border border-blue-500/50' 
                            : i < currentStep || showResults
                            ? 'bg-green-900/30 border border-green-500/50'
                            : 'bg-slate-700/30 border border-slate-600/50'
                        }`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            i === currentStep && isRunning
                              ? 'bg-blue-500 text-white animate-pulse'
                              : i < currentStep || showResults
                              ? 'bg-green-500 text-white'
                              : 'bg-slate-600 text-slate-300'
                          }`}>
                            {i + 1}
                          </div>
                          <div>
                            <div className={`font-semibold ${getTextSize('text-sm')} ${
                              i === currentStep && isRunning ? 'text-blue-300' : 'text-white'
                            }`}>
                              {step.title}
                            </div>
                            <div className={`text-slate-400 ${getTextSize('text-xs')}`}>
                              {step.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  {showResults && (
                    <div className="space-y-6">
                      <div>
                        <h5 className={`font-semibold text-green-400 mb-2 ${getTextSize('text-base')}`}>
                          📤 API Response
                        </h5>
                        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3">
                          <pre className={`text-green-400 font-mono ${getTextSize('text-sm')}`}>
                            {JSON.stringify(api.simulation.finalOutput, null, 2)}
                          </pre>
                        </div>
                      </div>

                      {/* Dossier Summary */}
                      <div>
                        <h5 className={`font-semibold text-blue-400 mb-4 ${getTextSize('text-lg')}`}>
                          📋 Analysis Summary
                        </h5>
                        {(() => {
                          const dossier = getDossierByAPI(api.id);
                          return dossier ? (
                            <EnhancedDossierSummary dossier={dossier} />
                          ) : (
                            <div className="p-4 bg-slate-700 border border-slate-600 rounded-lg">
                              <p className={`text-slate-300 ${getTextSize('text-sm')}`}>
                                Dossier summary not available for this API endpoint.
                              </p>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Expanded Content */}
              {isExpanded && (
                <div className="space-y-6">
                  {/* Full Capabilities */}
                  <div>
                    <h4 className={`font-semibold text-white mb-3 ${getTextSize('text-lg')}`}>
                      🎯 Full Capabilities
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {api.capabilities.map((capability, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-2 h-2 ${colors.bg} rounded-full`}></div>
                          <span className={`text-slate-300 ${getTextSize('text-sm')}`}>
                            {capability}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <h4 className={`font-semibold text-white mb-3 ${getTextSize('text-lg')}`}>
                      🚀 Use Cases & Applications
                    </h4>
                    <div className="space-y-4">
                      {api.useCases.map((useCase, i) => (
                        <div key={i} className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
                          <h5 className={`font-semibold ${colors.text} mb-2 ${getTextSize('text-base')}`}>
                            {useCase.title}
                          </h5>
                          <p className={`text-slate-300 mb-3 ${getTextSize('text-sm')}`}>
                            {useCase.description}
                          </p>
                          <ul className="space-y-1">
                            {useCase.examples.map((example, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <ChevronRight className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                <span className={`text-slate-400 ${getTextSize('text-sm')}`}>
                                  {example}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Quick Use-Case Demos */}
                    <div className="mt-6">
                      <h5 className={`font-semibold text-white mb-3 ${getTextSize('text-base')}`}>Quick Use‑Case Demos</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <a href="/site/demo/usecase/hereditary_breast_cancer" className={`text-center px-4 py-3 rounded-lg ${colors.bg} text-white font-semibold hover:opacity-90 transition ${getTextSize('text-sm')}`}>Hereditary Breast Cancer</a>
                        <a href="/site/demo/usecase/oncogene_activation" className={`text-center px-4 py-3 rounded-lg ${colors.bg} text-white font-semibold hover:opacity-90 transition ${getTextSize('text-sm')}`}>Oncogene Activation</a>
                        <a href="/site/demo/usecase/therapeutic_targeting" className={`text-center px-4 py-3 rounded-lg ${colors.bg} text-white font-semibold hover:opacity-90 transition ${getTextSize('text-sm')}`}>Therapeutic Targeting</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DemoFactory; 