### Forge page reference: what each section shows and why it matters

This guide maps everything visible on `/site/forge` to its purpose, the signals it conveys, and the (new) tooltips.


## Page layout at a glance
- Top half (Design workspace): `ObjectiveList`, `GuidedDesignPanel` (with Simulate), `SequencePeaksViewer`.
- Right column summary: `DesignResultSummary` (with KPI colors), `QCBadges` (threshold colors), `TrajectoryGraph`, `PresetsPanel`.
- Bottom half (Context): `CandidateTable`, `ConstraintPanel`, Benchmarks, “How this helps you”.


## Component-by-component

### `ObjectiveList`
- Shows: The design spec you asked for (peaks open/closed, TF motifs).
- Read: Each chip is a desired behavior at a locus; motifs add fine control.

### `GuidedDesignPanel` (tooltips + simulate)
- Shows: Solver settings and the objectives list.
- Tooltips added:
  - scorer: “Predictor used for guidance (Enformer/Borzoi)”
  - beam: “Search breadth (higher → better match, slower)”
  - tokens/bp: “Sampling budget per base pair (higher → better adherence)”
- Compute→quality bar: visual hint that more compute tightens fit.
- Simulate: animates an end-to-end improvement (AUROC up, trajectory rising).

### `SequencePeaksViewer`
- Shows: Designed accessibility vs target peaks. 
- Read: Alignment with target windows indicates objective adherence.

### `DesignResultSummary` (KPI coloring + tooltips)
- Shows: AUROC and key settings.
- KPI color: green ≥ 0.90, amber ≥ 0.80, red otherwise.
- Tooltips added:
  - AUROC: “Higher is better; ≥0.90 indicates strong target adherence.”
  - beam / tok/bp: “Increase for quality.”
  - scorer/model/seed: versioning and reproducibility.

### `QCBadges` (threshold colors + tooltips)
- Shows: Synteny, Pfam hits, Dinuc KL (naturalness).
- Thresholds: 
  - Synteny: green ≥ 0.90, amber ≥ 0.80
  - Pfam hits: green ≥ 0.70, amber ≥ 0.50
  - Dinuc KL (lower is better): green ≤ 0.15, amber ≤ 0.25
- Tooltips added:
  - Synteny: “Genome‑layout similarity to natural reference (0–1). Higher is better.”
  - Pfam hits: “Fraction of predicted proteins with domain hits.”
  - Dinuc KL: “Local sequence statistics vs reference genome; lower is more natural.”

### `TrajectoryGraph`
- Shows: Score vs step (convergence).
- Read: Rising curve → improving designs; plateau → sufficient compute.

### `PresetsPanel`
- Shows: Domain starting points (mito/microbial/yeast; immunotherapy presets in content).
- Read: Prefills sensible objectives/constraints before tuning.

### `CandidateTable`
- Shows: Ranked designs (score), synteny, Dinuc KL, notes.
- Read: Balance target match vs plausibility/naturalness.

### `ConstraintPanel`
- Shows: Practical feasibility filters (e.g., GC%, homopolymers).
- Read: All hard constraints should pass before handoff.

### Benchmarks (Evo2)
- Shows: Why the approach is trustworthy (guided AUROC ~0.9 at high compute, synteny/naturalness, Pfam hits).
- Read: External anchors that explain expected behavior when you increase compute.

### “How this helps you”
- Shows: Value translation for Biotech, Clinicians, Labs.
- Read: What to do next and how to interpret evidence in your context.


## What the metrics mean (one-liners)
- **AUROC**: Target‑match quality; ≥0.90 indicates strong adherence.
- **Synteny**: Similarity of gene layout to natural genome; ≥0.90 preferred.
- **Pfam hits**: Fraction of predicted proteins with recognizable domains; higher is better.
- **Dinuc KL**: Naturalness vs reference; ≤0.15 preferred.
- **beam / tok/bp**: Compute knob; increase to improve adherence (with diminishing returns).


## Demo script (2 minutes)
1) Objectives → “What we want the biology to do.”
2) Simulate → watch AUROC rise and the trajectory improve.
3) Summary + QCs → green thresholds = ready.
4) Candidates + Constraints → pick feasible designs; ensure 0 fails.
5) Benchmarks → why the compute knob works; when to stop.


## Notes
- Top (design) and bottom (context) are complementary: the top shows “doing”; the bottom shows “deciding.”
- All tooltips are live on chips/badges; threshold colors minimize the need to read long text. 