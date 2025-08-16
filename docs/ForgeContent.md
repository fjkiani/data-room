### ForgeContent: schema, UI mapping, and user-facing explanations

This document explains the `ForgeContent` data model used to render the Forge product page and related UI blocks. It breaks down each field, how it appears in the UI, what it means scientifically, and the user value for different audiences.


## 1) What Forge is (plain language)
- **Purpose**: Once a biological target is validated, Forge proposes therapeutic designs (edits, constructs, sequences) and the evidence that those designs meet your goals.
- **How it works**: You specify simple objectives (e.g., “open chromatin here”, “place a TF motif there”). Forge uses Evo2, a 40B-parameter foundation model with a 1M-token context window, to perform guided generation, proposing novel sequences that satisfy your objectives. More compute → better adherence.
- **Why trust it**: Forge inherits Evo2’s state-of-the-art benchmarks, including SOTA zero-shot prediction of clinical non-coding variants (`ClinVar`, `BRCA1`), successful generation of entire functional genomes, and high-fidelity guided design (AUROC ≈ 0.9).


## 2) Data model: fields and meaning

### about
- **oneLiner**: 1‑sentence positioning for non‑experts.
- **purpose**: What Forge is for—designing solutions, not just analysis.
- **inputs**: What users must provide (validated target, genomic context, objectives).
- **modalities**: Typical design outputs (e.g., correction blueprints, payloads, nanobodies).
- **outputs**: What Forge returns (candidate portfolio + rationale, QC badges, trajectories).
- **evo2Context**: How Evo2 capabilities power Forge (40B-parameter foundation model, 1M-token context window, Zero-shot biological understanding, Guided generative epigenomics).
- **benchmarks**: Named external validations that set expectations.

Use in UI: Shown in the page introduction and can be used for tooltips and onboarding cards.


### objectives (Design spec)
Each objective defines target behavior the design should achieve.
- **peak objective**: `{ type: 'peak', start, end, value }` indicates chromatin accessibility should be high (1) or low (0) in a region.
- **tf objective**: `{ type: 'tf', motif, start, end, weight? }` indicates a motif presence or occupancy influence in a region.

How users read it:
- Peaks define “open/closed” windows.
- TF objectives place or weight motif presence.

UI blocks: `ObjectiveList`, `GuidedDesignPanel`, `SequencePeaksViewer`.


### constraints (Practical feasibility filters)
Normal manufacturing/safety constraints applied before/during/after generation.
- Examples: GC% range, disallow homopolymers, restriction sites, max repeats.

UI blocks: `ConstraintPanel` and used internally by the generator and post‑filters.


### compute (Search/quality knob)
- **beamWidth**: number of partial continuations kept at each step. Larger → better but slower.
- **tokensPerBp**: sampling budget per base pair. Larger → improved adherence to objectives.

UI blocks: `GuidedDesignPanel` (exposes the knob), `DesignResultSummary` (reports it).


### trajectory (Design improvement trace)
Array of `{ step, score }` pairs.
- **step**: search iteration.
- **score**: objective match or design fitness (normalized).
- Interpretation: Upward trend = convergence; plateau = diminishing returns.

UI block: `TrajectoryGraph`.


### candidates (Ranked designs with QC)
Each candidate has:
- **id**: stable identifier.
- **score**: target‑match quality (e.g., AUROC proxy or normalized objective score).
- **qc.synteny**: similarity of gene order/layout to natural reference (0–1). Higher → more natural architecture.
- **qc.dinucKL**: dinucleotide Kullback‑Leibler divergence vs reference genome. Lower → more “natural”.
- **notes**: quick rationale or caveats.

UI blocks: `CandidateTable`, `DesignResultSummary`, `QCBadges` (if present).


### presets (Domain starting points)
Named presets prefill objectives/constraints for common domains (mito, microbial, yeast).

UI block: `PresetsPanel`.


### benchmarks (Evo2‑derived anchors of truth)
- **clinicalPrediction**: { noncodingSOTA: true, BRCA1_SOTA: true }
  - Meaning: Evo2 sets a new state-of-the-art for zero-shot prediction of pathogenic non-coding, indel, and splice-site variants from ClinVar. A supervised model built on its embeddings achieves SOTA on `BRCA1` variant classification.
- **guidedDesign**: { aurocHighCompute: 0.90, scaling: 'predictable', note: 'inference-time compute predictably improves design quality' }
  - Meaning: With higher compute, predicted epigenetic profiles match targets with AUROC near 0.9. This is the first demonstration of inference-time scaling in biology.
- **mito**: { geneCountsOK: true, af3Complexes: 'correct folds', syntenyPreserved: true }
  - Meaning: Generated mitochondria have the correct number of genes, whose protein products form complexes that fold correctly as validated by AlphaFold 3.
- **prokaryote**: { pfamHitFraction: 0.70, vsEvo1: '>3x improvement', pLDDT: 'near‑natural' }
  - Meaning: Genes in generated bacterial genomes show a 70% Pfam hit rate—a more than 3x improvement over Evo1 (18%)—and natural structural properties.
- **naturalness**: { dinucKL_low: true, note: 'avoids pathological sequences' }
  - Meaning: Base‑level statistics (Dinucleotide KL divergence) match the host genome, ensuring generated sequences are biologically plausible.

UI blocks: Benchmark cards under “Benchmarks (Evo2)”.


### audienceValue (User value by segment)
- **biotech**: Reduce wet‑lab iterations by trading compute for quality and filtering candidates with QC evidence.
- **oncologyClinicians**: Prototype regulatory edits; show quantifiable adherence to goals and QC to support go/no‑go.
- **geneticTestingLabs**: Design assay sequences/controls; provenance and QC streamline validation.

UI blocks: “How this helps you” cards.


## 3) UI mapping (content → component → what users see)

| Content field | UI component | What it shows | How to read |
| --- | --- | --- | --- |
| about.* | Page header, tooltips | One‑liner, purpose, inputs, outputs | Orientation for new users |
| objectives | ObjectiveList | Chips for peaks/motifs | The design spec you asked for |
| compute | GuidedDesignPanel | Beam width, tokens/bp | More compute → higher match |
| objectives + target profile | SequencePeaksViewer | Designed vs target peaks | Visual goal adherence |
| trajectory | TrajectoryGraph | Score vs step | Convergence and stop criteria |
| candidates | CandidateTable | Ranked designs + QC | Choose top designs |
| candidates[0], compute | DesignResultSummary | One‑glance AUROC, config | Quality snapshot |
| presets | PresetsPanel | Domain presets | Sensible starting points |
| constraints | ConstraintPanel | GC%, homopolymers, etc. | Practical feasibility |
| benchmarks.* | Benchmark cards | Evo2 evidence | Why trust the outputs |
| audienceValue.* | Audience cards | Benefits per user type | “So what?” translation |


## 4) Microcopy (ready to drop in tooltips)
- **Score**: “Target‑match probability. Higher = closer to your objectives.”
- **Synteny**: “Genome‑layout similarity to natural reference (0–1). Higher is better.”
- **Dinucleotide KL**: “Naturalness vs reference genome. Lower is better.”
- **Beam width**: “More partial continuations kept during search. Higher → better match, slower.”
- **Tokens per bp**: “Sampling budget per base pair. Higher → better objective adherence.”
- **Peaks**: “Open/closed chromatin targets for design.”
- **Motifs**: “Transcription factor binding patterns to place/avoid.”


## 5) Example: minimal ForgeContent
```ts
export const forgeContent = {
  about: {
    oneLiner: 'Turn validated targets into designs with explainable evidence.',
    purpose: 'Engineer therapeutic solutions once a target is validated.',
    inputs: ['Target + genomic context', 'Design objectives (peaks/motifs)'],
    modalities: ['Correction blueprints', 'Synthetic-lethal payloads'],
    outputs: ['Candidate portfolio', 'QC badges', 'Search trajectory'],
    evo2Context: ['40B-parameter foundation model', '1M-token context window', 'Zero-shot biological understanding', 'Guided generative epigenomics'],
    benchmarks: ['Guided design AUROC ~0.9', 'Near-natural sequence stats'],
  },
  objectives: [
    { type: 'peak', start: 20, end: 60, value: 1 },
    { type: 'tf', motif: 'CTCF', start: 80, end: 90, weight: 0.8 },
  ],
  constraints: [
    { label: 'GC%', value: '40–60' },
  ],
  compute: { beamWidth: 8, tokensPerBp: 4 },
  trajectory: [ { step: 1, score: 0.62 }, { step: 2, score: 0.65 } ],
  candidates: [
    { id: 'FORGE-001', score: 0.86, qc: { synteny: 0.94, dinucKL: 0.10 }, notes: 'Meets objectives tightly' },
  ],
  presets: [ { id: 'yeast', name: 'Yeast segment', description: 'Eukaryotic chromatin objectives' } ],
  benchmarks: {
    guidedDesign: { aurocHighCompute: 0.90, ensembleAgreement: 'high', note: 'AUROC increases with compute' },
    naturalness: { dinucleotideDelta: 0.0, note: 'Matches mm39 under genomic prompts' },
  },
  audienceValue: {
    biotech: ['Trade compute for quality; filter with QC to reduce rework'],
    oncologyClinicians: ['Prototype edits with quantifiable target match'],
    geneticTestingLabs: ['Design assay controls with provenance + QC'],
  },
} as const;
```


## 6) Practical reading guide (for demos)
1) Read the **one‑liner** and **purpose** (2 lines).
2) Scan **Objectives**: What behaviors are we asking for?
3) Check **Summary**: AUROC and compute settings.
4) Look at **Peaks viewer**: Do the designs match the target windows?
5) Review **Top candidates**: Balance match vs QC (synteny, dinuc KL).
6) If curious, expand **Trajectory** and **Benchmarks**.


## 7) Notes on provenance and safety
- Guided design uses Enformer+Borzoi consensus; agreement is surfaced as a quality signal.
- Naturalness metrics (dinucleotide KL) are reported to avoid pathological generations.
- Human viral generation is intentionally crippled in Evo2 by the explicit exclusion of eukaryotic viruses from its 9.3 trillion token training set. Forge presets do not target human viruses.


## 8) FAQ
- **What does “compute→quality” mean?**
  You can increase beam width/tokens‑per‑bp to improve objective adherence (e.g., AUROC), at the cost of time/compute.
- **Why synteny and dinuc KL?**
  They proxy biological plausibility: keep architecture and local statistics close to natural sequences.
- **Do I need motifs?**
  No—peaks alone are fine. Motifs add finer control when needed. 

## 9) Case study: RUNX1 (doctrine-aligned)

This section reflects the doctrine “RUNX1 Conquest” and explains how it appears in `ForgeContent` and the UI.

### Challenge
- Design a high‑efficiency HDR correction for RUNX1 with ultra‑long homology arms.
- Secondary objectives: CRISPR guides and a nanobody inhibitor in the RUNX1 pathway.

### Commands (natural language → structured spec)
- “Design a gene correction blueprint for RUNX1 (HDR arms ≥ 2 kb each).”
- “Forge a nanobody to inhibit ASXL1 protein.”
- “Create a synthetic‑lethal payload targeting TP53‑/‑ context.”

In `forgeContent.commands` as strings; used to render “What was asked?” callouts.

### Artifacts (forgeContent.caseStudies.runx1.artifacts)
- **hdrBlueprint**: `{ leftArmBp: 2000, rightArmBp: 2000, rationale: 'Longer arms improve HDR integration efficiency within the genomic neighborhood.' }`
  - UI: Candidate notes + a small “Blueprint” card in the sidebar (optional).
- **guides[]**: e.g., `{ id: 'gRUNX1‑001', pam: 'NGG', onTarget: 0.72, offTargetRisk: 'low' }`
  - UI: Appear as a small table under “Candidates” (or in an expandable drawer) with on‑target/off‑target hints.
- **nanobody**: `{ target: 'ASXL1', predictedAffinity: 'high', notes: 'Sequence proposed for wet‑lab validation' }`
  - UI: Info card with target and predicted affinity; link to provenance.

### Outcomes (forgeContent.caseStudies.runx1.outcomes)
- “Blueprint meets objectives in silico.”
- “Candidates pass synteny/naturalness QC.”
- “Ready for Command Center orchestration.”

UI: Render as a checklist under the case study card to communicate readiness.

### Pipeline (forgeContent.pipeline.steps)
1) Oracle: validate target and variants
2) Forge: specify objectives and generate candidates
3) Command Center: orchestrate runs, record provenance, prepare for validation

UI: Timeline/stepper strip to convey flow and ownership boundaries.

### IP & business value (forgeContent.ipValue)
- **Lead time**: “years → hours” portfolio generation.
- **Patentability**: novel compositions of matter + documented rationale.
- **Portfolio diversity**: multiple families per command.

UI: 3 KPI badges in the sidebar (or below case study) to translate technical wins into business impact.

### Minimal case study snippet
```ts
caseStudies: {
  runx1: {
    challenge: 'Design high‑efficiency HDR correction for RUNX1 with ultra‑long homology arms',
    artifacts: {
      hdrBlueprint: { leftArmBp: 2000, rightArmBp: 2000, rationale: 'Longer arms improve HDR integration efficiency within the genomic neighborhood.' },
      guides: [{ id: 'gRUNX1‑001', pam: 'NGG', onTarget: 0.72, offTargetRisk: 'low' }],
      nanobody: { target: 'ASXL1', predictedAffinity: 'high', notes: 'Sequence proposed for wet‑lab validation' },
    },
    outcomes: ['Blueprint meets objectives in silico', 'Candidates pass synteny/naturalness QC', 'Ready for Command Center orchestration'],
  },
}
```

### How to talk through it (demo script)
- “We asked Forge for an HDR blueprint with ≥2 kb arms around RUNX1. Objectives and constraints are here.”
- “Summary shows quality; Peaks viewer confirms target adherence.”
- “Top candidates pass synteny and naturalness QC—better manufacturability.”
- “We also produced guides and a nanobody concept; both are recorded with provenance.”
- “Command Center can now run validation workflows; artifacts are ready for review and IP.” 