export type ProductCapability = 'prediction' | 'generation' | 'optimization' | 'analysis';

export type Product = 'oracle' | 'forge' | 'boltz';

export type Industry = 'biotech' | 'clinical' | 'pharma' | 'diagnostics';

export type BusinessImpact = {
  label: string;
  before: string;
  after: string;
  improvement?: string;
};

export type BusinessMetric = {
  label: string;
  value: string;
  subtitle: string;
  improvement?: string;
};

export type BusinessContext = {
  problem: string;
  solution: string;
  impact: string;
  metrics: BusinessMetric[];
};

export type ComponentConfig = {
  type: string;
  context: Industry;
  story: string;
  data: any;
  props?: any;
  businessContext?: BusinessContext;
};

export type WorkflowStage = {
  id: string;
  title: string;
  description: string;
  product: Product;
  capability: ProductCapability;
  components: ComponentConfig[];
  businessImpact: BusinessImpact[];
  duration?: string;
  cost?: string;
};

export type TransformationWorkflow = {
  id: string;
  title: string;
  description: string;
  industry: Industry;
  capabilities: ProductCapability[];
  products: Product[];
  stages: WorkflowStage[];
  totalImpact: {
    timeReduction: string;
    costSavings: string;
    successRate: string;
    description: string;
  };
};

export type MultiModalContext = {
  [componentType: string]: {
    [industry in Industry]?: {
      [story: string]: {
        title: string;
        description: string;
        data: any;
        businessContext: BusinessContext;
        applicableProducts: Product[];
      };
    };
  };
};

export type IndustryProblem = {
  title: string;
  metrics: BusinessMetric[];
  description: string;
};

export type ValueProposition = {
  title: string;
  description: string;
  comparison: {
    traditional: { label: string; cost: string }[];
    enhanced: { label: string; cost: string }[];
  };
  impact: BusinessImpact[];
  components?: {
    primary?: ComponentConfig;
    secondary?: ComponentConfig[];
  };
};

export type TransformationSummary = {
  title: string;
  metrics: BusinessMetric[];
  description: string;
};

// Universal transformation data structure
export type UniversalTransformation = {
  industry: Industry;
  products: Product[];
  industryProblem: IndustryProblem;
  valuePropositions: ValueProposition[];
  summary: TransformationSummary;
  workflows?: TransformationWorkflow[];
}; 