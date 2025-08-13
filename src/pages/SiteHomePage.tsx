import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Fingerprint, Bot, FileClock, Globe, Building, Cpu, Search as SearchIcon, FlaskConical as FlaskIcon, Activity as ActivityIcon } from 'lucide-react';
import {
  HeroSection,
  ValuePillarsGrid,
  TwoLayerArchitectureVisual,
  AIEnginesGrid,
  SolutionsCards,
  DeploymentModels,
  TrustBadges,
  DataRoomPreviewGrid,
  CTABand,
} from '../components/site';
import type { ValuePillar, AIEngineCard, SolutionCard, DeploymentModel } from '../types/site';
import { sampleDecks } from '../data/sampleDecks.js';

const SiteHomePage: React.FC = () => {
  const navigate = useNavigate();

  const pillars: ValuePillar[] = [
    { icon: <Shield className="w-5 h-5 text-blue-600" />, title: 'Identity Layer (Auth0)', text: 'SSO, adaptive MFA, roles and orgs as source of truth for who.' },
    { icon: <Fingerprint className="w-5 h-5 text-cyan-600" />, title: 'Asset Control (Blockchain)', text: 'Smart-contract permissions and wallet mapping for what.' },
    { icon: <Bot className="w-5 h-5 text-orange-600" />, title: 'AI Engine Verification', text: 'Isolated execution, I/O signing, attestations, drift monitoring.' },
    { icon: <FileClock className="w-5 h-5 text-emerald-600" />, title: 'Immutable Audit', text: 'Tamper-proof logs, exportable reports, legal-grade provenance.' },
  ];

  const engines: AIEngineCard[] = [
    { name: 'Zeta Oracle', features: ['Variant interpretation', 'Signed outputs with timestamps', 'Dataset lineage and integrity'] },
    { name: 'Zeta Forge', features: ['Therapeutic candidate design', 'Run attestations and policy guardrails', 'Config fingerprints'] },
    { name: 'Zeta Boltz', features: ['3D structural validation', 'Binding affinity records on-chain', 'Anomaly/drift alerts'] },
  ];

  const solutions: SolutionCard[] = [
    { icon: <SearchIcon className="w-5 h-5 text-emerald-600" />, title: 'VUS Classification', points: ['Backlog processing', 'Pathogenic/Benign calls', 'Cryptographically signed results'] },
    { icon: <FlaskIcon className="w-5 h-5 text-emerald-600" />, title: 'In Silico R&D', points: ['Pre-clinical research digitally', 'Target validation and design', 'Comprehensive validation bundles'] },
    { icon: <ActivityIcon className="w-5 h-5 text-emerald-600" />, title: 'Precision Oncology', points: ['Model metastasis processes', 'Identify intervention points', 'Design targeted strategies'] },
  ];

  const models: DeploymentModel[] = [
    { title: 'Zeta Shield Cloud', icon: <Globe className="w-6 h-6 text-indigo-600" />, color: 'indigo', features: ['Multi-tenant SaaS', '99.99% uptime SLA', 'Global edge', 'Auto scaling'], pricing: 'Starting at $10K/month', ideal: 'Startups & Mid-size Biotechs' },
    { title: 'Zeta Shield Enterprise', icon: <Building className="w-6 h-6 text-purple-600" />, color: 'purple', features: ['Private cloud/VPC', 'Custom compliance', 'Dedicated support', 'On-prem option'], pricing: 'Custom enterprise pricing', ideal: 'Large Pharma & Fortune 500' },
    { title: 'Zeta Shield Embedded', icon: <Cpu className="w-6 h-6 text-cyan-600" />, color: 'cyan', features: ['API-first integration', 'White-label options', 'Custom workflows', 'Revenue sharing'], pricing: 'Per-transaction pricing', ideal: 'Platform Providers & VCs' },
  ];

  return (
    <div className="w-full bg-white">
      <HeroSection
        title="Secure AI R&D with asset-level control and verifiable trust"
        subtitle="Zeta Shield unifies Auth0 identity, blockchain permissions, AI engine verification, and immutable audit—so partners can trust every result."
        primaryCta={{ label: 'Request Access', href: '/request' }}
        secondaryCta={{ label: 'Explore Data Room', href: '/#data-room' }}
        badges={[{ label: 'SOC 2' }, { label: 'HIPAA' }, { label: 'GDPR' }, { label: 'ISO 27001' }]}
      />

      <ValuePillarsGrid pillars={pillars} />

      <TwoLayerArchitectureVisual
        identityTitle="Identity & Authentication (Auth0)"
        identityText="Auth0 is the authoritative source for user identity, roles, and orgs. Every user authenticates with MFA before any access."
        assetTitle="Asset-Level Access Control (Blockchain)"
        assetText="Smart contracts govern access to specific assets; every request is an on-chain event creating immutable audit."
      />

      <AIEnginesGrid engines={engines} />

      <SolutionsCards solutions={solutions} />

      <DeploymentModels models={models} />

      <section id="data-room" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Featured Decks</h2>
          <TrustBadges badges={[{ label: 'Executive Summaries' }]} />
        </div>
        <DataRoomPreviewGrid decks={sampleDecks} onOpen={(id) => navigate(`/deck/${id}`)} />
      </section>

      <CTABand
        title="Secure your AI R&D with verifiable trust"
        subtitle="Identity, asset control, AI verification, and immutable audit—deployed your way."
        primaryCta={{ label: 'Request Access', href: '/request' }}
        secondaryCta={{ label: 'Read Docs', href: '/docs' }}
      />
    </div>
  );
};

export default SiteHomePage; 