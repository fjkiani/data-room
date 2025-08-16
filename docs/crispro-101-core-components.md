## CrisPRO 101 — Core Components and Capabilities

Product: what problem we solve and how we solve it
Problem
R&D inefficiency: >90% clinical failure, $2.8B+ per approval, years to a candidate.
Actionability gap: up to 40% of genetic tests → VUS (no decision).
Structural risk: analyses stop at sequence; therapeutic efficacy depends on 3D interaction.
IP security gap: traditional IT secures infrastructure, not the asset (the therapeutic blueprint).
What customers need
Definitive target decisions, not ambiguous reports.
Designed candidates that fit the biological context.
In‑silico proof of mechanism to reduce wet‑lab risk.
Cryptographically verifiable provenance and access control for IP and audits.
Our solution (closed loop)
Zeta Oracle (Prediction): quantifies functional impact → resolves VUS into a verdict + Zeta Score.
Zeta Forge (Generation): 1M‑token context generative design → multi‑modal candidates (gene correction, lethal payloads, biologics).
Zeta Boltz (Structural Validation): AlphaFold‑powered 3D simulation → binding/efficacy confidence before synthesis.
R&D Command Center (Orchestration): turns inputs → evidence/candidates → “Digital Dossier.”
Security layer (Zeta Shield)
Identity + asset‑level control: Auth0 for “who”; blockchain for “what you’re allowed to do.”
Immutable provenance: every Oracle/Forge/Boltz decision signed and timestamped.
Enterprise deployment + compliance: cloud/enterprise/embedded, with SOC2/HIPAA/GDPR readiness.
Deliverable
Digital Dossier (de‑risked, financeable asset): target verdict + candidate portfolio + structural evidence + audit trail.
Optional IP‑NFT for financing/liquidity.
Why we’re different
Asset‑centric outcome; not reports.
Closed‑loop engines (predict → generate → validate) with quantitative outputs at each step.
Massive context window (1M tokens) enables designs others cannot express.
Verifiable security and provenance at the asset level.
Proof via use cases
RUNX1 case: two‑hit hypothesis → Oracle resolves target; Forge designs multi‑modal strategy; Boltz validates; dossier aligns to FDA tiers.
Security productization: identity + blockchain permissions; research pipeline verification; deployment/compliance tracks.
Business impact
Timeline compression: years → weeks for early stages.
Cost/risk reduction: wrong‑target spend eliminated; best candidates prioritized pre‑wet‑lab.
Fundable IP: dossiers → financing and partnerships faster.
KPIs to track
% VUS resolved; average Zeta Score confidence.
Candidate yield and pass‑rate after structural validation.
Time-to-dossier; cost per candidate reaching wet‑lab.
Compliance readiness and audit generation time.
GTM focus
Biotech R&D teams needing validated targets and candidates.
Platform providers/VCs needing verifiable IP and faster diligence.


### What CrisPRO is
- **One‑liner**: A full in‑silico R&D platform that turns uncertain genetic findings into validated, de‑risked therapeutic assets.
- **Outcome**: Not reports, but a de‑risked therapeutic dossier ready for financing and wet‑lab progression.

### System map (engines + orchestration)
- **Zeta Oracle (Prediction)**: Converts genetic uncertainty (VUS) into a quantitative, defensible verdict.
- **Zeta Forge (Generation)**: Designs multi‑modal therapeutic candidates from first principles.
- **Zeta Boltz (Structural Validation)**: Simulates 3D interactions to validate binding/efficacy before wet lab.
- **R&D Command Center (Orchestration)**: Routes inputs through the engines and assembles deliverables.

### Component breakdown

#### Zeta Oracle — Predictive intelligence
- **Purpose**: Resolve clinical uncertainty by understanding the “grammar of biology.”
- **Inputs**: Genomic variants, sequence context, prior evidence where available.
- **Core capability**: Computes the Zeta Score (functional damage) for any variant, including unseen ones.
- **Outputs**:
  - **Validated target verdict** (e.g., VUS → Pathogenic/Benign with confidence).
  - **Quantitative score** suitable for downstream decisioning and regulatory evidence.
- **Signals shown in deck**: Example Zeta Score −26,140.8; emphasis on AUROC > 0.95 for hard variants.
- **Customer value**: Unblocks go/no‑go target decisions and eliminates wrong‑target spend.

#### Zeta Forge — Generative therapeutic design
- **Purpose**: Engineer therapeutic solutions once a target is validated.
- **Inputs**: Validated target and biological neighborhood/context.
- **Core capability**: 1M‑token context generative design (unique advantage) enabling:
  - **Ultra‑long homology arms** for high‑efficiency gene correction.
  - **Complex, multi‑component designs** others cannot reliably fit in‑context.
- **Modalities produced**:
  - Gene correction blueprints
  - Synthetic‑lethal payloads
  - Novel nanobody/protein inhibitors
- **Outputs**: A portfolio of candidates with rationale and design parameters.
- **Customer value**: Collapses “lead generation” from years to hours; diversity of options.

#### Zeta Boltz — In‑silico structural validation
- **Purpose**: Provide 3D proof of mechanism for designed candidates.
- **Inputs**: Candidate sequences/structures from Zeta Forge; target structure/context.
- **Core capability**: AlphaFold‑3 powered interaction simulation and scoring.
- **Outputs**:
  - **Binding/complex confidence** (e.g., complex_plddt ~95.78 in deck examples).
  - **Prioritized candidates** with structural evidence before synthesis.
- **Customer value**: Dramatically reduces cost and risk before wet lab spends.

#### R&D Command Center — Orchestration
- **Purpose**: End‑to‑end pipeline management and narrative: Inputs → AI Core → Outputs.
- **Capabilities**:
  - Configurable presentation flows (demo/technical/business) to communicate value.
  - Aggregates evidence from Oracle, Forge, Boltz into a coherent deliverable.
  - Surfaces KPIs and status checkpoints.

### End‑to‑end pipeline (non‑military framing)
- **Target validation**: Convert uncertainty to a verdict with a numeric score.
- **Therapeutic design**: Generate multi‑modal candidates tailored to the validated target.
- **In‑silico validation**: Simulate 3D interactions; select best candidates based on structural confidence.
- **Asset packaging**: Assemble a Digital Dossier for funding, partnerships, and regulatory traction.

### Deliverables
- **Digital Dossier (Therapeutic Dossier)**
  - Target validation evidence (Zeta Score and rationale)
  - Design rationale and candidate portfolio
  - Structural validation summaries/scores
  - Clear status checkpoints (validation/design/structural)
- **IP‑NFT pathway (optional)**
  - **Minting**: Dossier minted as an IP‑NFT (verifiable record of invention)
  - **Funding**: Asset used to finance wet‑lab validation
  - **Liquidity**: Potential trading/secondary markets to create a new asset class for early‑stage biotech IP

### Predictive durability (resistance modeling)
- **Purpose**: Anticipate disease evolution to design future‑proof therapies.
- **Outputs**: Ranked mutation risk map (e.g., ASXL1/TET2/DNMT3A/IDH2 with qualitative risk levels).
- **Value**: Guides proactive design and portfolio hedging; reduces late‑stage surprises.

### Regulatory acceleration
- **FDA evidence mapping**
  - Aligns dossier content to tiers (case reports → RCTs)
  - Goal: reduce regulatory risk and compress approval timelines via strong digital evidence

### Differentiators
- **Asset‑centric outcome**: The unit of value is a de‑risked asset, not a report.
- **Closed‑loop engines**: Prediction → Generation → Structural Validation in one integrated system.
- **Massive context**: 1M‑token window unlocks designs others cannot express.
- **Quantitative at every stage**: Zeta Score, structural confidence, risk maps.

### What customers actually get
- **Validated target decisions** with quantitative confidence.
- **A designed candidate portfolio**, covering multiple therapeutic modalities.
- **3D structural evidence** to prioritize the best designs pre‑synthesis.
- **A financeable Digital Dossier** ready for wet‑lab execution and regulatory/BD conversations.
- **Option to tokenize as an IP‑NFT** for financing/liquidity.

### Audience‑specific value
- **Clinicians/Translational**: Removes ambiguity; produces actionable targets and candidates.
- **Biotech R&D**: Faster design cycles, diverse candidate set, objective prioritization metrics.
- **BD/Finance**: Assetization of discovery; clear evidence package for funding and partnerships.
- **Regulatory**: Structured, quantitative evidence aligned to recognized tiers.

### Notes mapped from the 101 deck
- R&D crisis metrics (>90% failure, $2.8B+, 5–10 years) contextualize the need.
- Oracle resolves VUS with a numeric, defensible score.
- Forge’s 1M‑token context is the core defensibility; enables ultra‑long HDR arms and complex constructs.
- Boltz supplies in‑silico structural proof, reducing wet‑lab risk.
- The dossier/IP‑NFT pathway converts insight into an investable, tradable asset.

### File reference
- Deck source: `src/data/decks/101.jsx`

---

### How to build with 101 components (deck + website)
- Import primitives and blocks from the site library using aliases:
```tsx
import {
  // primitives
  SlideSurface, SlideHeader,
  // blocks
  OracleScore, ForgeAssets, BoltzConfidence, ProcessStepper, DossierSummary,
} from '@site';
```

- Map 101 slide types → reusable blocks:
  - Oracle in Action → `OracleScore`
  - Forge Engineering → `ForgeAssets`
  - Boltz Structural Proof → `BoltzConfidence`
  - Process flows / “kill chain” → `ProcessStepper`
  - Digital Dossier / FDA → `DossierSummary`

- Example (website section):
```tsx
<SlideSurface enhanced>
  <SlideHeader title="Oracle in Action" subtitle="From uncertainty to a verdict" />
  <OracleScore
    left={{ title: 'Traditional Verdict', value: 'VUS', subtitle: '(Uncertain)' }}
    right={{ title: 'CrisPRO Verdict', value: 'Pathogenic', subtitle: '(Actionable)' }}
    score={{ title: 'Zeta Score (Functional Damage)', value: '-26140.8' }}
  />
</SlideSurface>
```

### Share content via registries (DRY)
- Keep copy/props in a typed registry under `@data` so decks and website share the same source.
- Suggested file: `src/data/crisproContent.ts` (example):
```ts
export const crisproContent = {
  oracle: {
    left: { title: 'Traditional Verdict', value: 'VUS', subtitle: '(Uncertain)' },
    right: { title: 'CrisPRO Verdict', value: 'Pathogenic', subtitle: '(Actionable)' },
    score: { title: 'Zeta Score (Functional Damage)', value: '-26140.8' },
  },
  forge: {
    input: 'Validated Pathogenic Threat',
    mission: 'Engineer Multi-Modal Therapeutics',
    assets: [ { icon: '🧬', label: 'Gene Correction Blueprint' } ],
    advantageTitle: 'Our Unfair Advantage:',
    advantageHighlight: '1M Token Context',
    advantageDescription: 'We see the entire genomic neighborhood.',
    forgeHeader: 'This allows us to forge:',
    forgeText: 'Ultra-long homology arms for high-efficiency correction.',
  },
};
```

- Use on both site and deck:
```tsx
import { crisproContent } from '@data/crisproContent';
import { OracleScore, ForgeAssets } from '@site';

<OracleScore {...crisproContent.oracle} />
<ForgeAssets {...crisproContent.forge} />
```

### Cross‑deck reuse (Security + RUNX1)
- Security wrappers (import namespace):
```tsx
import { Security } from '@site';
import { securityContent } from '@data/securityContent';
<Security.ArchitectureDiagram layers={securityContent.architecture.layers} />
<Security.ResearchPipeline steps={securityContent.researchPipeline.steps} footerText={securityContent.researchPipeline.footerText} />
```
- RUNX1 wrappers (import namespace):
```tsx
import { Runx1 } from '@site';
import { runx1Content } from '@data/runx1Content';
<Runx1.TwoHitDiagram steps={runx1Content.twoHit.steps} />
<Runx1.RiskMap {...runx1Content.riskMap} />
```

### Purge‑safety, accessibility, performance
- Avoid dynamic Tailwind templates (e.g., `text-${color}-400`); use variant maps in wrappers.
- Respect global scaling via `AccessibilityContext` (font size set on `:root`).
- Keep Three.js visuals for cinematic mode only; pause animations when the tab is hidden.

### KPIs (to include in pages/decks)
- % VUS resolved; average Zeta Score confidence
- Candidate yield and pass‑rate after structural validation
- Time‑to‑dossier; cost per candidate reaching wet‑lab
- Compliance readiness and audit generation time

### Testing checklist
- Sections render responsively (mobile/desktop)
- No grey gutters in thumbnails; previews use first slide
- Large Text toggle scales 101 blocks and site sections without overlap
- Build succeeds (`npm run build`); no dynamic Tailwind classes left 

---

### Evo2‑powered modes (plain English)
- **Oracle (Prediction)**
  - Zero‑shot scoring for coding, noncoding, and indels (no task‑specific training).
  - Optional supervised “task heads” trained on Evo2 embeddings for specific loci (e.g., BRCA1/BRCA2).
  - “Explain” view: highlight exon/intron edges, transcription‑factor motifs, and frameshift sensitivity learned by the model.
- **Forge (Generation)**
  - Guided design: set simple objectives like “open chromatin here, closed there” or “boost TF occupancy,” and let the model search.
  - Compute knob: more search → tighter match to your objective (with clear, diminishing‑returns display).
  - Genome‑scale presets (mitochondria, microbial, yeast segment) with automatic quality checks.
- **Boltz (Validation)**
  - Summarize 3D complex plausibility (AlphaFold‑based) and mark candidates that pass thresholds.

### Benchmarks & datasets we reference
- ClinVar (pathogenic vs benign), SpliceVarDB (splice‑altering variants), BRCA1/2 (functional screens), DART‑Eval (regulatory DNA tasks).
- We report standard metrics (AUROC/AUPRC) by variant type and region, plus easy‑to‑read calibration plots.

### Safety & provenance (what’s built‑in)
- Human‑infecting viral generation is intentionally weak and guarded; we keep negative‑control checks.
- Every design run records provenance: model + version, scorer + version, compute settings, and seeds.
- Zeta Shield includes identity (Auth0) and asset‑level permissions (blockchain) for “who” and “what.”

### Simple API outline (for engineers)
- Oracle
  - `POST /oracle/zero-shot` → scores and Δlikelihood for a list of variants in context.
  - `POST /oracle/supervised` → task‑head predictions using Evo2 embeddings.
  - `GET /oracle/explain` → top SAE features + spans for a locus (exon/intron/TF signals).
- Forge
  - `POST /forge/generate` → sequences from a prompt (with QC badges).
  - `POST /forge/guided` → designs that match simple chromatin/TF objectives (with AUROC vs spec and logs).
- Boltz
  - `POST /boltz/validate` → structure‑confidence summaries for complexes.

This section keeps the big ideas simple: crisp decisions from Oracle, practical designs from Forge, hard proof from Boltz, and strong guardrails and provenance from Zeta Shield. Anyone reading should understand what we do, how we measure it, and how to use it. 