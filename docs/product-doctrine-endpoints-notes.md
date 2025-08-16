## Endpoint-to-Product Notes (Sequential Digest)

This document captures a sequential read of `.cursor/rules/endpoints.md` and maps each capability to UI components, registries, adapters, and concrete next steps.

### Discriminative (Oracle)

#### /predict_variant_impact
- Inputs: ref/alt context (8,192 nt window), or locus + assembly
- Outputs: delta_likelihood_score, pathogenicity_prediction, evo2_confidence, predicted_consequence, feature_disruption_scores
- Algorithm: Evo2 score on ref vs alt; delta likelihood; optional SAE explainability (exon/intron/TF/frameshift)
- Validation: ClinVar (coding/noncoding, SNV/indel) – calibration plots expected
- UI mapping:
  - Blocks: OracleExplainTrack (explain), VEPMetrics (AUROC/AUPRC by class), VariantDetailCard
  - New: CalibrationPlot (reliability), DeltaLLHistogram
- Registry fields:
  - oracleContent: explain{sequence, variant, saeFeatures, deltaLLSeries}, vepMetrics{byClass[]}, exemplarVariant
  - + calibration: {bins[], expected[], observed[]}, distributions: {deltaLL[]}
- Adapter: @data/adapters/oracle.toExplainBlocks, toCalibration
- Guardrails/KPIs: %VUS resolved, mean |delta_ll|, calibration error

#### /predict_gene_essentiality
- Inputs: gene + context (cell line, mutations)
- Outputs: essentiality_score, category
- Algorithm: KO proxy (DNA mode for coding), lncRNA tiling (tile delta)
- UI mapping: New EssentialityChart (bar/sparkline per context)
- Registry: oracleContent.essentialitySeries[{context, score}], contexts[]
- Adapter: toEssentialityChart
- KPI: top-N essential targets per context

#### /predict_chromatin_accessibility
- Inputs: sequence or locus; optional context
- Outputs: accessibility_score/state; optional tracks via Enformer/Borzoi
- UI mapping: SequencePeaksViewer (binary/intervals), New AccessibilityTrack (continuous)
- Registry: oracleContent.accessibilityTracks[{pos, score}] + intervals
- Adapter: toAccessibilityTrack
- KPI: target accessibility at locus, off-target accessibility distribution

#### /predict_protein_functionality_change
- Inputs: WT vs MUT sequence (DNA or protein)
- Outputs: protein_functionality_score_change (+ stability/folding proxy)
- UI mapping: New ProteinDeltaCard (function/stability deltas)
- Registry: oracleContent.proteinDelta{function, stability, notes}
- Adapter: toProteinDeltaCard
- KPI: share of variants above/below threshold

### Generative (Forge)

#### /generate_optimized_guide_rna
- Inputs: target, PAM, num_candidates, constraints
- Outputs: guides with on_target, off_target, accessibility, composite_score
- UI mapping: New GuideRNAList (on/off-target/access columns) + CandidateTable
- Registry: forgeContent.guides[{sequence, onTarget, offTarget, access, score}]
- Adapter: toGuideListBlocks
- KPI: top-k composite score, off-target risk distribution

#### /generate_repair_template (HDR)
- Inputs: locus, desired_edit, homology_arm_length
- Outputs: templates with likelihood, QC
- UI mapping: New RepairTemplateCard (arms, likelihood, QC badges)
- Registry: forgeContent.repairTemplates[{leftArm,rightArm,edit,likelihood,qc}]
- Adapter: toRepairTemplateBlocks
- KPI: predicted integration likelihood, QC pass rate

#### /generate_epigenome_optimized_sequence
- Inputs: genomic_context, target pattern, compute budget (tokens/bp, beam)
- Outputs: designed_sequence, AUROC vs spec, tracks
- Algorithm: chunked beam-search; score each chunk via Enformer/Borzoi
- UI mapping: GuidedDesignPanel (objectives/compute), SequencePeaksViewer (target pattern), DesignResultSummary (AUROC)
- Registry: forgeContent.objectives, compute, peaks, summary
- Adapter: toForgeBlocksExtended (already present)
- KPI: AUROC vs spec, tokens/bp

#### /generate_optimized_regulatory_element
- Inputs: expression_goal, motif profile, context
- Outputs: sequence, motif_hits, predicted_accessibility
- UI mapping: New MotifHitTable + AccessibilityTrack
- Registry: forgeContent.regulatoryElements[{sequence, motifHits[], accessScore}]
- Adapter: toRegulatoryBlocks
- KPI: predicted expression vs goal proxy

#### /generate_therapeutic_protein_coding_sequence
- Inputs: desired function, family, organism
- Outputs: candidates with function_score, structure_score
- UI mapping: CandidateTable + (Boltz) StructuralQCPanel
- Registry: forgeContent.proteins[{dna, protein, functionScore, structureScore}]
- Adapter: toProteinDesignBlocks
- KPI: composite score, pass-rate above thresholds

### Structural Validation (Boltz)
- AF3 complex plausibility integrated with provenance
- UI mapping: ProductBoltz (KPIs, runs), New StructuralQCPanel, ComplexGallery
- Registry: boltzContent.structures[{id, confidence, preview?}], qcThresholds, runs
- Adapter: @data/adapters/boltz.ts
- KPIs: %≥threshold, avg confidence, runs/day

### Orchestration (Command Center)
- Orchestrates engines; logs; evidence; roles; provenance
- UI mapping: PipelineGraph, RunLogPanel, ProvenancePanel, KPIStrip, WorkQueue, EvidencePanel, RoleMatrix
- New: APIActivityTable, JobTimeline, ArtifactList, ResourceUsage
- Registry: commandCenterContent.apiEvents[], timeline[], artifacts[], resource[]
- Adapter: @data/adapters/commandCenter.ts
- KPIs: p95 latency, queue time, success‑rate

---

## Concrete next tasks (ordered)
1) Registries: add `oracleContent` with about + essentiality/accessibility/proteinDelta; extend `commandCenterContent`/`boltzContent` with `about`
2) Blocks: build EssentialityChart, AccessibilityTrack, ProteinDeltaCard, GuideRNAList, RepairTemplateCard, MotifHitTable, StructuralQCPanel, APIActivityTable, JobTimeline
3) Adapters: add oracle/boltz/commandCenter adapters; extend forge adapter for guides/repair/regulatory/protein
4) Pages: add ProductOracle; augment ProductForge/ProductBoltz/ProductCommandCenter with new sections
5) Deck: wire `siteBlocks` via adapters for new demos; continue headless extraction in 101 
 
 
 
 
 
 
 
 