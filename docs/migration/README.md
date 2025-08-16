## Migration Plan — Data Room → Shared Website System

This README is a handoff for another LLM/engineer to drive the next phase. It explains the product story, where components live, how content is organized, and the precise steps to migrate decks and build the website from the same sources.

### 1) Mission and End‑State
- **Mission**: Single source of truth for content and components powering both the Data Room (decks) and the Website.
- **End‑state**: Slides and website sections share the same component library and content registries. Copy changes in one place update both.

### 2) Repo Map and Aliases
- Aliases (configured in `vite.config.ts` and `tsconfig.app.json`):
  - `@site` → `src/components/site`
  - `@slides` → `src/components/slides`
  - `@data` → `src/data`

### 3) Component Taxonomy (Where things live)
- Primitives (low‑level UI)
  - Path: `src/components/site/CrisproDeckPrimitives.tsx`
  - Exports: `SlideSurface`, `SlideHeader`, `StatCard`, `InfoCard`, `TwoColumn`, `StepArrow`, `Pill`, `EvidenceList`
- Blocks (domain building blocks)
  - Path: `src/components/site/blocks/`
  - Exports: `OracleScore`, `ForgeAssets`, `BoltzConfidence`, `ProcessStepper`, `DossierSummary`
- Security wrappers (site‑ready, purge‑safe)
  - Path: `src/components/site/security/`
  - Exports: `ArchitectureDiagram`, `DeploymentMatrix`, `ComplianceBadges`, `IdentityIntegrations`, `ResearchPipeline`, `AccessMatrix`
- Website sections (marketing)
  - Path: `src/components/site/`
  - Exports: `HeroSection`, `ValuePillarsGrid`, `TwoLayerArchitectureVisual`, `AIEnginesGrid`, `SolutionsCards`, `DeploymentModels`, `TrustBadges`, `CompetitiveTable`, `CTABand`, `PricingTiers`, `DataRoomPreviewGrid`
- Aggregator export
  - Path: `src/components/site/index.ts`
  - Usage: `import { SlideSurface, OracleScore } from '@site'` or `import { Security } from '@site'`

### 4) Content Registries (Single Source of Truth)
- Security registry (populated)
  - Path: `src/data/securityContent.ts`
  - Shapes taken from `src/types/site.ts` (`ArchitectureLayer`, `DeploymentModel`, `CompetitiveRow`, etc.)
- Add registries for other product areas as needed:
  - e.g., `src/data/crisproContent.ts`, `src/data/companyContent.ts`, etc.
- Guideline: Keep these pure data (no JSX), typed, and variant‑safe (no dynamic Tailwind strings).

### 5) Product Story (Site + Decks)
- Recommended narrative order:
  1. Problem (R&D crisis / Security problem)
  2. Solution overview (Engines / Zeta Shield intro)
  3. Core engines (Oracle → Forge → Boltz) and their evidence
  4. Architecture (platform/security layers)
  5. Research pipeline (process/steps)
  6. Deployment models & compliance
  7. Competitive differentiation
  8. Deliverable (Digital Dossier / IP‑NFT) + CTA
- Website builds sections from `@site` components; decks use `custom-react` components but should consume the same registries.

### 6) Migration Steps (Phased)
- Phase A — Content centralization
  - [ ] Move any remaining hard‑coded copy in decks into registries in `@data/*`.
  - [ ] Normalize icons to either component types or elements per block. Avoid mixing within one block.
  - [ ] Replace dynamic Tailwind class templates with map‑based variants.
- Phase B — Component adoption
  - [ ] Replace ad‑hoc JSX in `security.jsx` with `@site/Security` wrappers where feasible.
  - [ ] For CrisPRO 101 decks, extract repeated islands into blocks (already provided) and wire to registries as useful.
- Phase C — Website assembly
  - [ ] Create pages under `src/pages/site/*` and compose sections using `@site` components.
  - [ ] Feed props from registries (e.g., `securityContent`).
  - [ ] Add route entries in `src/App.tsx` (lazy + Suspense).
- Phase D — Performance & QA
  - [ ] Ensure heavy visuals (Three.js) are disabled for non‑cinematic contexts; pause on `document.hidden`.
  - [ ] Verify mobile touch/swipe in viewer; ensure website sections are responsive (grid breakpoints).
  - [ ] Run build; check bundle sizes (Vite/Rollup); lazy‑load large decks.

### 7) How to Use the Components (Examples)
- Security architecture + deployments
```tsx
import { Security, CompetitiveTable } from '@site';
import { securityContent } from '@data/securityContent';

<Security.IdentityIntegrations
  auth0={securityContent.identity.auth0}
  blockchain={securityContent.identity.blockchain}
  strategic={securityContent.identity.strategic}
/>
<Security.ArchitectureDiagram layers={securityContent.architecture.layers} />
<Security.ResearchPipeline
  steps={securityContent.researchPipeline.steps}
  footerText={securityContent.researchPipeline.footerText}
/>
<Security.AccessMatrix title={securityContent.accessMatrix.title} items={securityContent.accessMatrix.items} />
<Security.DeploymentMatrix models={securityContent.deployments} />
<Security.ComplianceBadges badges={securityContent.compliance} />
<CompetitiveTable rows={securityContent.competitive.rows} title="Traditional vs IP‑Centric" />
```
- Primitives + blocks (CrisPRO)
```tsx
import { SlideSurface, SlideHeader, OracleScore, ForgeAssets } from '@site';

<SlideSurface enhanced>
  <SlideHeader title="Oracle in Action" subtitle="From uncertainty to verdict" />
  <OracleScore
    left={{ title: 'Traditional Verdict', value: 'VUS' }}
    right={{ title: 'CrisPRO Verdict', value: 'Pathogenic' }}
    score={{ title: 'Zeta Score', value: '-26140.8' }}
  />
</SlideSurface>
```

### 8) Tailwind Purge‑Safety
- Avoid dynamic class templates like `text-${color}-400`.
- Use explicit maps (see `Security/*` wrappers) or a finite union of variants.
- If dynamic variants are required, add a safelist to `tailwind.config.js`.

### 9) Accessibility
- Components respect global scaling via `AccessibilityContext`.
- Keep contrast and semantic headings (h1/h2/h3) within sections.

### 10) Performance
- Use `React.lazy` + `Suspense` for pages and heavy decks.
- Limit Three.js usage to cinematic contexts; reduce node counts on mobile; pause when tab is hidden.

### 11) Testing & QA Checklist
- [ ] Build succeeds: `npm run build`
- [ ] All routes load, including deep links (Vercel rewrite in `vercel.json` is present)
- [ ] Mobile swipe/tap in viewer; website grids wrap correctly
- [ ] Large‑text toggle scales site and decks without overflow
- [ ] Thumbnails render first slide centered; no grey gutters

### 12) Contribution Rules (for LLMs/Agents)
- Prefer editing components/registries over hard‑coding copy in pages or decks.
- Keep props typed; don’t introduce dynamic Tailwind strings.
- When adding new sections, create a typed content registry first, then a wrapper component if needed.
- Maintain alias imports; place new site sections under `@site`, registries under `@data`.
- After edits to code or schemas, run a local build.

### 13) Backlog (Next Candidates)
- Extract remaining security deck visuals: CompetitiveSection wrapper, Compliance dashboard panel.
- Create `crisproContent.ts` for Oracle/Forge/Boltz demos; wire `blocks/` across decks and site.
- Add SEO copy helpers in `docs` based on existing `.cursor/rules/`.

This plan ensures a DRY, typed, purge‑safe system where the website and decks evolve together. Hand this README to an LLM and instruct it to follow phases A→D, using the aliases and directories above. 