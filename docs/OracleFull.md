Title: Oracle Vertical — End‑to‑End Specification
1) Positioning
One‑liner: Oracle is our discriminative engine that turns raw genomic variation into quantitative, explainable, clinically useful decisions.
Scope: variant impact (coding/noncoding/indels), essentiality by context, chromatin accessibility, protein functional change.
2) Endpoints and algorithms (from Evo2)
/predict_variant_impact
Inputs: ref/alt sequences (8,192 nt window) or locus + assembly (GRCh38)
Algorithm: Evo2.score(ref|alt), delta_likelihood_score = alt_ll − ref_ll; SAE explain (exon/intron/TF/frameshift)
Outputs: {delta_likelihood_score, pathogenicity_prediction, confidence, feature_disruption_scores}
Validation: ClinVar (coding/noncoding, SNV/indel). Targets: AUROC > 0.90 coding SNVs; > 0.85 noncoding.
/predict_gene_essentiality
Inputs: gene + context (cell line, mutations)
Algorithm: KO proxy (DNA mode insert stop codons at offsets); lncRNA: 100‑bp tile scramble; aggregate deltas
Outputs: {essentiality_score, category}
Validation: DEG, phage, lncRNA essentiality; expect rank correlation with published screens.
/predict_chromatin_accessibility
Inputs: sequence or locus (+ optional cell type)
Algorithm: Tier 1 Evo2 likelihood + SAE TF motifs; Tier 2 Enformer/Borzoi tracks → summarized accessibility_score/state
Outputs: {accessibility_score, accessibility_state, tracks?}
Validation: DART‑Eval (Tasks 1/2/5); retain cache for external calls.
/predict_protein_functionality_change
Inputs: WT vs MUT sequence (DNA or protein)
Algorithm: DNA‑mode delta (preferred) or protein embeddings; optional stability/folding proxy (ESM/AF3)
Outputs: {protein_functionality_score_change, predicted_stability_change?, folding_impact_score?}
Validation: DMS correlations; ProteinGym.
3) Product UI mapping (blocks)
Variant impact: OracleExplainTrack, VEPMetrics, VariantDetailCard
Essentiality: EssentialityChart (new)
Accessibility: AccessibilityTrack (new), SequencePeaksViewer for patterns
Protein delta: ProteinDeltaCard (new)
Calibration: CalibrationPlot (new), DeltaLLHistogram (new)
KPIs: KPIStrip with %VUS resolved, calibration error (ECE), mean confidence
4) Content registry and adapters
File: src/data/oracleContent.ts
about: {oneLiner, purpose, inputs, outputs, evo2Context, benchmarks}
explain: {sequence, variant{pos,ref,alt}, saeFeatures[], deltaLLSeries[]}
vepMetrics: {byClass: [{name, auroc, auprc?}]}
essentialitySeries: [{context, score}]