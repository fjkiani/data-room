import React, { useState, useMemo } from 'react';
import { Forge as ForgeUI, GuidedDesignPanel, SequencePeaksViewer, DesignResultSummary } from '../components/site';
import { Arsenal, Dossier } from '../components/site/runx1';
import { ForgeAssets, ProcessStepper } from '../components/site/blocks';
import DossierSummary from '../components/site/blocks/DossierSummary';
import QCBadges from '../components/site/blocks/QCBadges';
import { forgeContent } from '../data/forgeContent';
import { toForgeNamespaceProps } from '../data/adapters/forge';

const ProductForge: React.FC = () => {
	const [simStep, setSimStep] = useState<number>(0);
	const [auroc, setAuroc] = useState<number>(forgeContent.candidates[0]?.score || 0.85);
	const p = toForgeNamespaceProps(forgeContent);

	const series = useMemo(() => {
		// simple simulated improvement curve up to 12 steps
		return Array.from({ length: 12 }, (_, i) => ({ step: i + 1, score: Math.min(0.9, (forgeContent.trajectory[i]?.score ?? 0.6 + i * 0.02) + (simStep > i ? 0.01 * (i + 1) : 0)) }));
	}, [simStep]);

	const handleSimulate = () => {
		let step = 0;
		const id = setInterval(() => {
			step += 1;
			setSimStep(step);
			setAuroc(prev => Math.min(0.9, prev + 0.005));
			if (step >= 12) clearInterval(id);
		}, 250);
	};

	const best = forgeContent.candidates[0];

	// Process steps for the enhanced stepper
	const processSteps = [
		{ 
			title: 'Oracle Validates', 
			description: 'SOTA variant prediction provides therapeutic confidence',
			accent: 'cyan' as const
		},
		{ 
			title: 'Forge Designs', 
			description: 'Guided generation creates multi-modal therapeutics',
			accent: 'purple' as const
		},
		{ 
			title: 'Command Center Orchestrates', 
			description: 'Provenance tracking and validation workflows',
			accent: 'orange' as const
		},
	];

	return (
		<div className="min-h-screen bg-slate-900 text-slate-100">
			<div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
				{/* Hero Section with Context */}
				<section className="text-center space-y-6">
					<h1 className="text-5xl font-bold text-white">Forge</h1>
					<p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
						{forgeContent.about.oneLiner}
					</p>
					<div className="flex flex-wrap justify-center gap-3 text-sm text-slate-400">
						{forgeContent.about.evo2Context.map((context, i) => (
							<span key={i} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full font-medium text-slate-200">
								{context}
							</span>
						))}
					</div>
				</section>

				{/* Enhanced Process Flow */}
				<section className="space-y-8">
					<div className="text-center space-y-4">
						<h2 className="text-3xl font-semibold text-white">The Agentic Design Loop</h2>
						<p className="text-lg text-slate-300 max-w-3xl mx-auto">
							{forgeContent.agentic.mission}
						</p>
					</div>
					<ProcessStepper steps={processSteps} />
					
					{/* Agentic Loop Details */}
					<div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
						<h3 className="text-xl font-semibold text-white mb-6">Autonomous Design Process</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{forgeContent.agentic.loop.map((step, i) => (
								<div key={i} className="p-4 bg-slate-700 rounded-lg border border-slate-600">
									<div className="flex items-center gap-2 mb-2">
										<div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
											{i + 1}
										</div>
										<h4 className="font-medium text-white">
											{step.split(':')[0]}
										</h4>
									</div>
									<p className="text-sm text-slate-300">
										{step.split(':')[1]?.trim()}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* RUNX1 Case Study with Arsenal */}
				<section className="space-y-8">
					<div className="text-center space-y-4">
						<h2 className="text-3xl font-semibold text-white">Victory Demonstrated: RUNX1 Conquest</h2>
						<p className="text-lg text-slate-300">
							{forgeContent.caseStudies.runx1.challenge}
						</p>
					</div>
					
					<Arsenal 
						input="Validated RUNX1 Pathogenic Variant"
						processTitle="Multi-Modal Forge"
						outputs={['HDR Blueprint (4kb arms)', 'Guide RNA (gRUNX1-001)', 'ASXL1 Nanobody']}
					/>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<Dossier 
							dossier={[
								{ title: 'HDR Blueprint', subtitle: `${forgeContent.caseStudies.runx1.artifacts.hdrBlueprint.leftArmBp + forgeContent.caseStudies.runx1.artifacts.hdrBlueprint.rightArmBp} bp arms` },
								{ title: 'Guide Efficiency', subtitle: `${forgeContent.caseStudies.runx1.artifacts.guides[0].onTarget} on-target` },
								{ title: 'Nanobody Affinity', subtitle: forgeContent.caseStudies.runx1.artifacts.nanobody.predictedAffinity },
							]}
							tiers={[
								{ title: 'Design Complete' },
								{ title: 'QC Validated' },
								{ title: 'Ready for Command Center' },
							]}
							text={forgeContent.caseStudies.runx1.artifacts.hdrBlueprint.rationale}
						/>
						
						<DossierSummary 
							assetId="Asset: CS-RUNX1-GC-001"
							status="Ready for Wet-Lab"
							checkpoints={forgeContent.caseStudies.runx1.outcomes.map(outcome => ({ label: outcome }))}
							description="Complete multi-modal therapeutic portfolio with provenance and QC validation."
						/>
					</div>
				</section>

				{/* Forge Assets Showcase */}
				<section className="space-y-8">
					<h2 className="text-3xl font-semibold text-white text-center">Our Unfair Advantage</h2>
					<ForgeAssets 
						input="Validated Pathogenic Threat"
						mission="Engineer Multi-Modal Therapeutics"
						assets={forgeContent.about.modalities.map(modality => ({ 
							icon: <span>🧬</span>, 
							label: modality 
						}))}
						advantageTitle="Our Unfair Advantage:"
						advantageHighlight="40B Parameter Evo2"
						advantageDescription="1M token context window sees the entire genomic neighborhood. Zero-shot biological understanding ensures design plausibility."
						forgeHeader="This enables us to forge:"
						forgeText="Ultra-long homology arms, multi-component designs, and novel therapeutic proteins impossible for smaller models."
					/>
				</section>

				{/* Interactive Design Interface */}
				<section className="space-y-8">
					<div className="text-center space-y-4">
						<h2 className="text-3xl font-semibold text-white">Try It: Design Interface</h2>
						<p className="text-lg text-slate-300">
							Specify your objectives and watch Forge generate optimized sequences with predictable scaling.
						</p>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-6">
							<ForgeUI.ObjectiveList {...p.objectiveList} />
							<GuidedDesignPanel onSimulate={handleSimulate} objectives={forgeContent.objectives as any} scorer="enformer" beamWidth={forgeContent.compute.beamWidth} tokensPerBp={forgeContent.compute.tokensPerBp} />
							<SequencePeaksViewer length={200} peaks={forgeContent.objectives.filter(o => o.type === 'peak').map((pp: any) => ({ start: pp.start, end: pp.end, value: pp.value || 1 }))} variantPos={88} />
						</div>
						<div className="space-y-6">
							<DesignResultSummary auroc={auroc} compute={forgeContent.compute} scorerVersion="enformer-2024.08" modelVersion="evo2-1m" seed={42} />
							{best && (
								<QCBadges synteny={best.qc.synteny} pfamHitRate={forgeContent.benchmarks.prokaryote.pfamHitFraction} dinucKL={best.qc.dinucKL} />
							)}
							<ForgeUI.TrajectoryGraph series={series as any} />
							<ForgeUI.PresetsPanel {...p.presets} />
						</div>
					</div>
				</section>

				{/* Immunotherapy Specialization */}
				<section className="space-y-8">
					<div className="text-center space-y-4">
						<h2 className="text-3xl font-semibold text-white">Immunotherapy Specialization</h2>
						<p className="text-lg text-slate-300">
							Pre-configured workflows for cancer immunotherapy design
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{forgeContent.immunotherapy.presets.map((preset, i) => (
							<div key={i} className="p-6 bg-slate-800 border border-slate-700 rounded-xl">
								<h3 className="text-lg font-semibold text-white mb-3">{preset.name}</h3>
								<div className="space-y-2 text-sm text-slate-300">
									{Object.entries(preset.params).map(([key, value]) => (
										<div key={key} className="flex justify-between">
											<span className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
											<span className="font-mono text-xs text-slate-400">{Array.isArray(value) ? value.join(', ') : String(value)}</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Results */}
				<section className="space-y-8">
					<h2 className="text-3xl font-semibold text-white text-center">Generated Candidates</h2>
					<ForgeUI.CandidateTable {...p.candidateTable} />
					<ForgeUI.ConstraintPanel {...p.constraints} />
				</section>

				{/* IP Value Proposition */}
				<section className="space-y-8">
					<h2 className="text-3xl font-semibold text-white text-center">Business Impact</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="p-8 bg-gradient-to-br from-green-900/40 to-green-800/40 border border-green-700/50 rounded-2xl">
							<h3 className="text-2xl font-bold text-green-300 mb-2">Lead Time</h3>
							<p className="text-3xl font-black text-green-100">{forgeContent.ipValue.leadTimeCompression.split('→')[1].trim()}</p>
							<p className="text-green-400 mt-2">Portfolio generation time</p>
						</div>
						<div className="p-8 bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-700/50 rounded-2xl">
							<h3 className="text-2xl font-bold text-purple-300 mb-2">IP Value</h3>
							<p className="text-lg font-semibold text-purple-100">Novel Compositions</p>
							<p className="text-purple-400 mt-2">{forgeContent.ipValue.patentability}</p>
						</div>
						<div className="p-8 bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-700/50 rounded-2xl">
							<h3 className="text-2xl font-bold text-blue-300 mb-2">Portfolio</h3>
							<p className="text-lg font-semibold text-blue-100">Multiple Families</p>
							<p className="text-blue-400 mt-2">{forgeContent.ipValue.portfolioDiversity}</p>
						</div>
					</div>
				</section>

				{/* Validation & Benchmarks */}
				<section className="space-y-8">
					<div className="text-center space-y-4">
						<h2 className="text-3xl font-semibold text-white">Scientific Validation</h2>
						<p className="text-lg text-slate-300 max-w-3xl mx-auto">
							Forge's capabilities are validated across multiple domains and use cases, ensuring reliable performance for therapeutic design.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
						<div className="p-6 rounded-xl border border-cyan-700/50 bg-gradient-to-br from-cyan-900/30 to-cyan-800/30">
							<div className="font-bold text-cyan-300 mb-3 text-lg">Clinical Prediction</div>
							<div className="space-y-2 text-cyan-200">
								<div>Non-coding variants: <span className="font-semibold">SOTA</span></div>
								<div>BRCA1 classification: <span className="font-semibold">SOTA</span></div>
							</div>
							<div className="text-cyan-400 mt-3 text-xs">Foundation for therapeutic confidence</div>
						</div>
						<div className="p-6 rounded-xl border border-slate-600 bg-slate-800">
							<div className="font-bold text-white mb-3 text-lg">Guided Design</div>
							<div className="space-y-2 text-slate-200">
								<div>AUROC (high compute): <span className="font-semibold">{forgeContent.benchmarks.guidedDesign.aurocHighCompute}</span></div>
								<div>Scaling: <span className="font-semibold">Predictable</span></div>
							</div>
							<div className="text-slate-400 mt-3 text-xs">{forgeContent.benchmarks.guidedDesign.note}</div>
						</div>
						<div className="p-6 rounded-xl border border-slate-600 bg-slate-800">
							<div className="font-bold text-white mb-3 text-lg">Generation Quality</div>
							<div className="space-y-2 text-slate-200">
								<div>Mitochondria: <span className="font-semibold">Functional</span></div>
								<div>Prokaryote Pfam: <span className="font-semibold">{Math.round(forgeContent.benchmarks.prokaryote.pfamHitFraction * 100)}%</span></div>
								<div>Naturalness: <span className="font-semibold">Preserved</span></div>
							</div>
						</div>
					</div>
				</section>

				{/* Audience Value */}
				<section className="space-y-8">
					<h2 className="text-3xl font-semibold text-white text-center">How This Transforms Your Work</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{Object.entries(forgeContent.audienceValue).map(([audience, benefits]) => (
							<div key={audience} className="p-6 rounded-xl border border-slate-600 bg-slate-800">
								<div className="font-bold text-white mb-4 text-lg capitalize">
									{audience.replace(/([A-Z])/g, ' $1').trim()}
								</div>
								<ul className="list-disc list-inside text-slate-200 space-y-2 text-sm">
									{benefits.map((benefit, i) => (
										<li key={i}>{benefit}</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};

export default ProductForge; 