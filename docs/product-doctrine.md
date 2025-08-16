## CrisPRO Product Doctrine — Component‑first plan

### Objectives
- **Showcase product capabilities** via reusable UI components, not monolithic pages.
- **Single source of truth** for copy/props in typed content registries under `@data`.
- **Adapters** map registries → UI block props for both decks and website.
- **Headless slides** for decks so slides import components + registry data.
- **Evo2 alignment** baked into Forge/Oracle/Boltz content and blocks.

### Project pillars
- **Content registries (`@data`)**: typed, copy + props only, no React
  - `securityContent.ts`, `runx1Content.ts`, `crispro101Content.ts`
  - `forgeContent.ts`, `boltzContent.ts`, `commandCenterContent.ts`
- **Adapters (`@data/adapters`)**: pure mapping functions
  - `crispro101.ts` → `toOracleBlocks`, `toForgeBlocks`, `toBoltzBlocks`
  - `forge.ts` → `toForgeBlocksExtended`, `toForgeNamespaceProps`
  - Add `commandCenter.ts`, `boltz.ts` (next)
- **Blocks (`@site/blocks`)**: product capability primitives (portable)
  - Oracle: `OracleExplainTrack`, `VEPMetrics`, `VariantDetailCard`
  - Forge: `GuidedDesignPanel`, `DesignResultSummary`, `QCBadges`, `SequencePeaksViewer`
  - Command/Infra: `PipelineGraph`, `RunLogPanel`, `ProvenancePanel`, `KPIStrip`, `ProcessStepper`
- **Namespaces** (domain bundles)
  - `@site/Forge`: `ObjectiveList`, `TrajectoryGraph`, `CandidateTable`, `PresetsPanel`, `ConstraintPanel`
  - `@site/Command`: `WorkQueue`, `EvidencePanel`, `RoleMatrix`
  - `@site/Security`, `@site/Runx1`
- **Headless slides (`@slides`)** for decks
  - `ZetaOracleInAction`, `ZetaForgeTwoColumn`, `StructuralGauntlet`
- **Pages** (website composition)
  - `ProductForge.tsx`, `ProductCommandCenter.tsx`, `ProductBoltz.tsx`, `SiteHomePage.tsx`

### How pieces connect
- **Registry → Adapter → Blocks** (web pages and decks)
  1) Keep copy/props in `@data` registries
  2) Use adapter(s) to shape props for `@site/blocks`/namespaces
  3) Compose pages or slides from those components

### Aliases and types
- Vite: `@site` → `src/components/site`, `@slides` → `src/components/deck/slides`, `@data` → `src/data`
- TS paths mirror Vite (see `vite.config.ts`, `tsconfig.app.json`)

### Capability maps (what to use where)
- **Oracle**
  - Blocks: `OracleExplainTrack`, `VEPMetrics`, `VariantDetailCard`
  - Registry: `crispro101Content.oracle`, adapter: `toOracleBlocks`
- **Forge**
  - Blocks: `GuidedDesignPanel`, `DesignResultSummary`, `QCBadges`, `SequencePeaksViewer`
  - Namespace: `Forge.ObjectiveList`, `Forge.TrajectoryGraph`, `Forge.CandidateTable`, `Forge.PresetsPanel`, `Forge.ConstraintPanel`
  - Registry: `forgeContent` (+ `crispro101Content.forge`), adapter: `toForgeBlocksExtended`
- **Boltz**
  - Blocks: (reuse) `PipelineGraph`, `RunLogPanel`, `ProvenancePanel`, `KPIStrip`
  - Registry: `boltzContent` (+ `crispro101Content.boltz`), adapter: add `toBoltzBlocksExtended`
- **Command Center**
  - Blocks: `PipelineGraph`, `RunLogPanel`, `ProvenancePanel`, `KPIStrip`
  - Namespace: `Command.WorkQueue`, `Command.EvidencePanel`, `Command.RoleMatrix`
  - Registry: `commandCenterContent`, adapter: add `toCommandBlocks`

### Decks: make slides headless
- Use `content.type: 'custom'` + `content.render()` and call headless slide components
- Provide `content.siteBlocks = adapter(registry)` for block render where applicable
- Example (101): Oracle/Forge/Boltz deep dives already use adapters; three core slides use headless components

### Pages: product composition
- `ProductForge.tsx`: intro (from `forgeContent.about`) + `Forge.*` + core blocks
- `ProductCommandCenter.tsx`: pipeline/logs/KPIs/provenance + `Command.*`
- `ProductBoltz.tsx`: KPIs + sim runs (add pipeline/logs/provenance next)

### Evo2‑driven enhancements (what to add)
- Forge: objectives presets (promoter/enhancer), SAE‑feature targeting, QC thresholds
- Oracle: variant explain presets per locus, calibration plots from benchmarks
- Boltz: template QC for structure plausibility, thresholds surfaced in KPIs
- Command Center: unified provenance across engines; reproducibility controls (seed, config fingerprints)

### Copy ownership
- Keep explanatory copy under `registry.about.*` fields (e.g., `forgeContent.about`)
- Blocks remain presentational; pages/slides render copy from registries

### Purge‑safety, a11y, performance
- Use static Tailwind maps in components; avoid template class strings
- Respect `AccessibilityContext` (scales text via :root font‑size)
- Lazy‑load pages/routes; keep heavy visuals to cinematic mode

### Contribution rules
- New capability = registry + adapter + block(s) + (optional) headless slide + page section
- No business copy inside components; put it in registries
- Add tests/checks: build passes, a11y scaling works, purge‑safe classes

### Minimal usage patterns
```ts
// Registry → Blocks via adapter (deck siteBlocks)
import { toForgeBlocksExtended } from '@data/adapters/forge';
import { forgeContent } from '@data/forgeContent';
const siteBlocks = toForgeBlocksExtended(forgeContent);

// Page composition
import { Forge } from '@site';
<Forge.ObjectiveList objectives={forgeContent.objectives} constraints={forgeContent.constraints} />
```

### Capability breakdown and next iteration

#### Oracle (Prediction)
- What it does
  - Zero‑shot variant impact; context‑aware essentiality; chromatin accessibility; protein function deltas.
- Today
  - Components: `OracleExplainTrack`, `VEPMetrics`, `VariantDetailCard`
  - Registry: `crispro101Content.oracle`
  - Adapters: `toOracleBlocks`
  - Pages/Deck: add to ProductOracle (planned); deep‑dive slides in 101
- Next iteration
  - UI: EssentialityChart, AccessibilityTrack, ProteinDeltaCard
  - Registry: `oracleContent.about`, `essentialitySeries[]`, `accessibilityTracks[]`, `proteinDelta`
  - Adapters: `@data/adapters/oracle.ts` to map new fields → blocks
  - KPIs: %VUS resolved, calibration plots, mean confidence

#### Forge (Generation)
- What it does
  - Guided epigenomic design (peaks/TF); HDR templates; guides; regulatory elements; protein coding sequences.
- Today
  - Components: `GuidedDesignPanel`, `SequencePeaksViewer`, `DesignResultSummary`, `QCBadges`
  - Namespace: `Forge.ObjectiveList`, `Forge.TrajectoryGraph`, `Forge.CandidateTable`, `Forge.PresetsPanel`, `Forge.ConstraintPanel`
  - Registry: `forgeContent` (+ `crispro101Content.forge`)
  - Adapters: `toForgeBlocksExtended`, `toForgeNamespaceProps`
  - Pages/Deck: `ProductForge.tsx`; 101 deep‑dive via adapters; headless slide in 101
- Next iteration
  - UI: GuideRNAList (on/off‑target/access), RepairTemplateCard (arms/likelihood/QC), MotifHitTable
  - Registry: `forgeContent.guides[]`, `repairTemplates[]`, `regulatoryElements[]`
  - Adapters: extend `forge.ts` to map new lists
  - KPIs: design match AUROC, QC pass‑rate, candidates/run

#### Boltz (Structural Validation)
- What it does
  - AF3 complex plausibility; structure QC; provenance.
- Today
  - Components: reuse `PipelineGraph`, `RunLogPanel`, `ProvenancePanel`, `KPIStrip`
  - Registry: `boltzContent` (+ `crispro101Content.boltz`)
  - Pages: `ProductBoltz.tsx`
  - Headless slide: `StructuralGauntlet`
- Next iteration
  - UI: StructuralQCPanel (threshold badges), ComplexGallery (thumbs/ids)
  - Registry: `boltzContent.structures[]`, `qcThresholds`
  - Adapters: `@data/adapters/boltz.ts` → blocks
  - KPIs: complex_confidence ≥ threshold %, avg confidence, runs/day

#### Command Center (Orchestration)
- What it does
  - Orchestrates Oracle/Forge/Boltz; logs; KPIs; evidence; roles; provenance.
- Today
  - Components: `PipelineGraph`, `RunLogPanel`, `ProvenancePanel`, `KPIStrip`
  - Namespace: `Command.WorkQueue`, `Command.EvidencePanel`, `Command.RoleMatrix`
  - Registry: `commandCenterContent`
  - Page: `ProductCommandCenter.tsx`
- Next iteration
  - UI: APIActivityTable (endpoint/latency), JobTimeline (mini‑Gantt), ArtifactList, ResourceUsage
  - Registry: `apiEvents[]`, `timeline[]`, `artifacts[]`, `resource[]`
  - Adapters: `@data/adapters/commandCenter.ts`
  - KPIs: p95 latency, queue time, runs success‑rate

### Implementation checklist (next sprint)
- Registries
  - [ ] Add `oracleContent` with about + essentiality/accessibility/protein delta
  - [ ] Extend `commandCenterContent` and `boltzContent` with `about` sections
- Blocks
  - [ ] EssentialityChart, AccessibilityTrack, ProteinDeltaCard (Oracle)
  - [ ] GuideRNAList, RepairTemplateCard, MotifHitTable (Forge)
  - [ ] StructuralQCPanel, ComplexGallery (Boltz)
  - [ ] APIActivityTable, JobTimeline (Command Center)
- Adapters
  - [ ] `@data/adapters/oracle.ts`, `@data/adapters/boltz.ts`, `@data/adapters/commandCenter.ts`
- Pages/Decks
  - [ ] ProductOracle page composition
  - [ ] Wire new blocks into 101 via `content.siteBlocks` and headless slides

### Deck/page mapping
- Deck (101)
  - Use headless slides (`@slides`) + `content.siteBlocks = adapter(registry)`
- Website
  - Compose product pages from `@site/blocks` and namespaces, copy from `registry.about`

### Migration
- Other app can import via the same aliases/paths or a workspace package:
  - packages/content → `@data`, packages/site-ui → `@site`
- Keep adapters pure (no React) for easy reuse across apps 

### Endpoint‑to‑Product notes (sequential)
- Source: `.cursor/rules/endpoints.md` (full digest in `docs/product-doctrine-endpoints-notes.md`).
- Oracle
  - /predict_variant_impact → OracleExplainTrack, VEPMetrics, VariantDetailCard; add CalibrationPlot, DeltaLLHistogram; registry: explain, vepMetrics, calibration.
  - /predict_gene_essentiality → EssentialityChart (new); registry: essentialitySeries.
  - /predict_chromatin_accessibility → AccessibilityTrack (new) + SequencePeaksViewer; registry: accessibilityTracks.
  - /predict_protein_functionality_change → ProteinDeltaCard (new); registry: proteinDelta.
- Forge
  - /generate_epigenome_optimized_sequence → GuidedDesignPanel, SequencePeaksViewer, DesignResultSummary.
  - /generate_optimized_guide_rna → GuideRNAList (new), CandidateTable; registry: guides.
  - /generate_repair_template → RepairTemplateCard (new); registry: repairTemplates.
  - /generate_optimized_regulatory_element → MotifHitTable (new), AccessibilityTrack; registry: regulatoryElements.
  - /generate_therapeutic_protein_coding_sequence → CandidateTable + StructuralQCPanel (new); registry: proteins.
- Boltz
  - AF3 integration → StructuralQCPanel (new), ComplexGallery (new), KPIStrip; registry: structures, qcThresholds, runs.
- Command Center
  - Orchestration → PipelineGraph, RunLogPanel, ProvenancePanel, KPIStrip, WorkQueue, EvidencePanel, RoleMatrix; add APIActivityTable (new), JobTimeline (new); registry: apiEvents, timeline.

### Immediate next tasks
- Registries: add `oracleContent` (about, essentialitySeries, accessibilityTracks, proteinDelta, vepMetrics); extend `commandCenterContent`/`boltzContent` with `about`.
- Blocks: build EssentialityChart, AccessibilityTrack, ProteinDeltaCard, GuideRNAList, RepairTemplateCard, MotifHitTable, StructuralQCPanel, APIActivityTable, JobTimeline.
- Adapters: add `@data/adapters/oracle.ts`, `@data/adapters/boltz.ts`, `@data/adapters/commandCenter.ts`; extend `forge.ts`.
- Pages/Decks: add `ProductOracle.tsx`; surface new sections on Forge/Boltz/Command pages; wire 101 slides via adapters + headless components. 

### Hallmarks of Cancer — product alignment
- Purpose: Map engines to hallmark-relevant analyses and designs
- Oracle (discriminative)
  - Variant impact on hallmark pathways (oncogenes, tumor suppressors, apoptosis, angiogenesis, invasion/metastasis, metabolism, immune evasion, inflammation)
  - Blocks: VariantDetailCard, VEPMetrics, OracleExplainTrack; add CalibrationPlot
  - Registry: `oracleContent.hallmarkScores[{hallmark, score, evidence}]`
  - Adapter: `toHallmarkScoreBlocks`
  - KPIs: % variants mapped to hallmark categories; mean confidence
- Forge (generative)
  - Design levers per hallmark (e.g., repress TERT promoter, activate TP53 expression; knockout BCL2; disrupt VEGFA)
  - Blocks: GuidedDesignPanel, MotifHitTable (new), AccessibilityTrack (new), CandidateTable
  - Registry: `forgeContent.interventions[{hallmark, strategy, artifacts}]`
  - Adapter: `toInterventionBlocks`
  - KPIs: match-to-objective AUROC, QC pass-rate
- Boltz (validation)
  - Structure plausibility for designed proteins/complexes relevant to hallmark targets
  - Blocks: StructuralQCPanel (new), ProvenancePanel, KPIStrip
  - Registry: `boltzContent.structures[]`, `qcThresholds`
  - KPIs: %≥threshold, avg confidence

### Human Genome Project — product alignment
- Copy focus: Evo2 closes gaps revealed post-HGP (noncoding “dark matter”, isoforms, fewer genes than expected)
- Oracle
  - Noncoding competence: /predict_variant_impact + /predict_chromatin_accessibility → show noncoding variant explanations
  - Blocks: OracleExplainTrack + AccessibilityTrack (new)
  - Registry: `oracleContent.nonCodingDemos[]`
- Forge
  - Long-context design: show HDR arm design and regulatory element optimization leveraging 1M-token context
  - Blocks: RepairTemplateCard (new), MotifHitTable (new), SequencePeaksViewer
  - Registry: `forgeContent.about.evo2Context`, `repairTemplates`, `regulatoryElements`
- Command Center
  - Provenance/versioning to track model evolution and reproducibility across long-context runs
  - Blocks: ProvenancePanel, KPIStrip

### Use-cases — mappings and blocks
- Hereditary breast cancer (BRCA1/2, PALB2, CHEK2, ATM)
  - Oracle: bulk /predict_variant_impact; protein deltas; chromatin accessibility
    - Blocks: VEPMetrics, VariantDetailCard, ProteinDeltaCard (new), AccessibilityTrack (new)
    - Registry: `oracleContent.useCases.hereditaryBreastCancer.*`
  - Forge: generate repair templates or regulatory up-regulation (TP53 goal)
    - Blocks: RepairTemplateCard (new), MotifHitTable (new), GuidedDesignPanel
    - Registry: `forgeContent.useCases.hereditaryBreastCancer.*`
  - Boltz: validate structural plausibility of designed proteins if applicable
    - Blocks: StructuralQCPanel (new)
  - KPIs: % VUS resolved; designed template likelihood; structural pass-rate
- Newborn genetic screening & intervention
  - Oracle: scalable screening via /predict_variant_impact; highlight treatable pediatric panels
    - Blocks: KPIStrip (throughput), VEPMetrics; add ScreeningSummary (new)
    - Registry: `oracleContent.useCases.newbornScreening.panels[]`
  - Forge: repair templates or protein addition designs
    - Blocks: RepairTemplateCard (new), CandidateTable
  - Command Center: orchestrate batch runs; APIActivityTable (new), JobTimeline (new)
  - KPIs: time-to-screen, #treatable findings, design turnaround

### Action items from Hallmarks/HGP/use-cases
- Registries
  - [ ] `oracleContent.hallmarkScores`, `oracleContent.nonCodingDemos`, `oracleContent.useCases.*`
  - [ ] `forgeContent.interventions`, `forgeContent.useCases.*`
- Blocks
  - [ ] CalibrationPlot, DeltaLLHistogram, EssentialityChart, AccessibilityTrack, ProteinDeltaCard
  - [ ] RepairTemplateCard, MotifHitTable, GuideRNAList, StructuralQCPanel, ScreeningSummary
- Adapters
  - [ ] `@data/adapters/oracle.ts` → hallmark scores, noncoding demos, use-cases
  - [ ] `@data/adapters/forge.ts` → interventions, use-cases
- Pages/Deck
  - [ ] ProductOracle/ProductForge sections per use-case
  - [ ] 101 deep‑dive slides use adapters for hallmark/HGP demos 