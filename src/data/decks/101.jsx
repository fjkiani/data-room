//================================================================================
// 🎯 SLIDE CONFIGURATION - Easy to reorder and manage!
//================================================================================

// Define your slide order here - just change the order to rearrange!
const SLIDE_ORDER = [
  'title',
  'crisis', 
  'actionability-gap',
  'command-center',
  'oracle-action',
  'zeta-oracle-uncertainty',
  'generative-advantage',
  'forge-action',
  'structural-blind-spot',
  'boltz-action',
  // Add the new slides from your other presentation
  'rd-command-center',
//   'zeta-oracle-uncertainty',
  'beyond-analysis',
  'zeta-forge-engineering',
  'ip-nft-lifecycle',
  // Add the kill chain slides
  'rd-efficiency-crisis',
  'kill-chain-target',
  'kill-chain-target-detail',
  'kill-chain-forge',
  'kill-chain-forge-detail',
  'kill-chain-boltz',
  'kill-chain-boltz-detail',
  'kill-chain-asset',
  'kill-chain-asset-detail',
  // Continue with existing slides
  'ip-nft',
  'competitive-advantage',
  'target-validation',
  'deliverable'
];

// You can also create different presentation flows:
const PRESENTATION_MODES = {
  full: SLIDE_ORDER, // Full presentation
  demo: ['title', 'crisis', 'oracle-action', 'forge-action', 'competitive-advantage'], // Quick demo
  technical: ['title', 'oracle-action', 'forge-action', 'boltz-action', 'command-center'], // Technical focus
  business: ['title', 'crisis', 'competitive-advantage', 'ip-nft', 'deliverable'], // Business focus
  alternative: ['title', 'rd-command-center', 'zeta-oracle-uncertainty', 'beyond-analysis', 'zeta-forge-engineering', 'ip-nft-lifecycle'], // Alternative flow with new slides
  combined: ['title', 'crisis', 'rd-command-center', 'oracle-action', 'zeta-oracle-uncertainty', 'forge-action', 'zeta-forge-engineering', 'competitive-advantage'], // Best of both
  killchain: ['title', 'rd-efficiency-crisis', 'kill-chain-target', 'kill-chain-target-detail', 'kill-chain-forge', 'kill-chain-forge-detail', 'kill-chain-boltz', 'kill-chain-boltz-detail', 'kill-chain-asset', 'kill-chain-asset-detail'], // Full kill chain process
  process: ['title', 'kill-chain-target', 'kill-chain-forge', 'kill-chain-boltz', 'kill-chain-asset'] // Simplified process view
};

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dna, BrainCircuit, Zap, TestTube2, Shield, Globe, ArrowRight, Bot, Cpu, Database,
  Cuboid, AlertTriangle, FlaskConical, Package, Banknote, Recycle, Puzzle, Target, Microscope,
  Map, HardHat, Bolt, ClipboardList, Target as TargetIcon, Shield as ShieldIcon,
  Package as PackageIcon, Banknote as BanknoteIcon, Recycle as RecycleIcon, Cpu as CpuIcon,
  Bot as BotIcon, ArrowRight as ArrowRightIcon, UserCheck, Lock
} from 'lucide-react';
import * as THREE from 'three';

//================================================================================
// 1. REUSABLE UI & LAYOUT COMPONENTS
//================================================================================

/**
 * Renders the brand logo.
 */
const Brand = () => (
  <div className="absolute bottom-6 right-6 z-20 text-lg font-semibold text-slate-400/80">
    CrisPRO.ai 🧬
  </div>
);

/**
 * Renders an animated digital synapse network using Three.js for the background.
 */
const DigitalSynapseBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        // Create nodes
        const nodes = [];
        const nodeGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });

        for (let i = 0; i < 100; i++) {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
            node.position.set(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );
            node.velocity = new THREE.Vector3(
              (Math.random() - 0.5) * 0.1, 
              (Math.random() - 0.5) * 0.1,
              (Math.random() - 0.5) * 0.1
            );
            nodes.push(node);
            scene.add(node);
        }

        const lines = new THREE.Group();
        scene.add(lines);

        // Animation loop
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            lines.children.forEach(line => {
                line.material.opacity -= 0.01;
                if (line.material.opacity <= 0) lines.remove(line);
            });

            nodes.forEach(node => {
                node.position.add(node.velocity);
                if (Math.abs(node.position.x) > 50) node.velocity.x *= -1;
                if (Math.abs(node.position.y) > 50) node.velocity.y *= -1;
                if (Math.abs(node.position.z) > 50) node.velocity.z *= -1;
            });

            if (Math.random() > 0.95 && lines.children.length < 50) {
                const node1 = nodes[Math.floor(Math.random() * nodes.length)];
                const node2 = nodes[Math.floor(Math.random() * nodes.length)];
                if (node1 !== node2) {
                    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8 });
                    const points = [node1.position, node2.position];
                    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                    const line = new THREE.Line(lineGeometry, lineMaterial);
                    lines.add(line);
                }
            }
            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
             if (currentMount) {
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-0 opacity-20"></div>;
};

/**
 * A layout wrapper for a standard slide.
 */
const SlideLayout = ({ children, className = '' }) => (
    <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative w-full h-full flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200 overflow-hidden ${className}`}
    >
        <div className="relative z-10 w-full max-w-5xl space-y-10">
            {children}
        </div>
    </motion.section>
);

/**
 * A layout wrapper for slides with the 3D synapse background.
 */
const EnhancedSlideLayout = ({ children, className = '' }) => (
     <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative w-full h-full flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200 overflow-hidden ${className}`}
    >
        <DigitalSynapseBackground />
        <Brand />
        <div className="relative z-10 w-full max-w-6xl space-y-12">
            {children}
        </div>
    </motion.section>
);

/**
 * Renders the main title and subtitle for a slide.
 */
const SlideHeader = ({ title, subtitle, titleClassName = '', subtitleClassName = '' }) => (
    <div className="space-y-3">
        <h1 className={`text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${titleClassName}`}>
            {title}
        </h1>
        {subtitle && (
            <p className={`text-2xl md:text-3xl font-light text-slate-300 max-w-4xl mx-auto ${subtitleClassName}`}>
                {subtitle}
            </p>
        )}
    </div>
);

/**
 * A reusable card for displaying statistics.
 */
const StatCard = ({ value, label, className = '' }) => (
    <div className={`bg-slate-800/50 p-6 rounded-xl border border-slate-700 ${className}`}>
        <p className="text-6xl font-black text-red-400">{value}</p>
        <p className="text-xl text-slate-300 mt-2">{label}</p>
    </div>
);

/**
 * A reusable card for displaying features with an icon.
 */
const InfoCard = ({ icon, title, children, color = 'cyan' }) => (
    <div className={`bg-slate-800/50 p-6 rounded-xl border border-${color}-500/30 text-center`}>
        {icon && React.createElement(icon, { size: 48, className: `mx-auto text-${color}-400 mb-4` })}
        <h4 className={`text-xl font-bold text-${color}-400 mb-2`}>{title}</h4>
        <div className="text-slate-400">{children}</div>
    </div>
);

/**
 * Navigation controls for the slideshow.
 */
const NavigationControls = ({ current, total, onPrev, onNext }) => (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-black/30 backdrop-blur-sm p-2 rounded-full border border-slate-700">
        <button onClick={onPrev} className="px-4 py-2 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors">&larr;</button>
        <span className="text-slate-300 font-semibold text-sm">Slide {current + 1} / {total}</span>
        <button onClick={onNext} className="px-4 py-2 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors">&rarr;</button>
    </div>
);

// --- Custom Content Components ---

const TwoColumnLayout = ({ children, className = '' }) => (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start text-left max-w-6xl mx-auto ${className}`}>
        {children}
    </div>
);

const SimpleTextBlock = ({ icon, mainText, subText, iconColor, borderColor }) => (
    <div className={`bg-slate-800/50 p-8 rounded-2xl border ${borderColor} max-w-4xl mx-auto`}>
        {React.createElement(icon, { size: 64, className: `mx-auto ${iconColor} mb-4` })}
        <p className="text-xl text-slate-300 mb-4" dangerouslySetInnerHTML={{ __html: mainText }}></p>
        <p className="text-lg text-slate-400" dangerouslySetInnerHTML={{ __html: subText }}></p>
    </div>
);

const ProcessSteps = ({ steps }) => (
    <div className="flex flex-col lg:flex-row items-center justify-around w-full space-y-8 lg:space-y-0 lg:space-x-8">
        {steps.map((step, index) => (
            <React.Fragment key={index}>
                <div className="flex flex-col items-center space-y-4">
                    <div className={`text-6xl p-4 rounded-full border-2 ${step.borderColor} ${step.bgClass} text-${step.iconColor}-400`}>
                        {React.createElement(step.icon, {})}
                    </div>
                    <h3 className={`text-3xl font-bold text-${step.iconColor}-400`}>{step.title}</h3>
                    {step.description && <p className="text-slate-400 text-lg max-w-xs">{step.description}</p>}
                </div>
                {index < steps.length - 1 && <div className="text-5xl text-slate-500 animate-pulse">➡️</div>}
            </React.Fragment>
        ))}
    </div>
);

// Additional components from your other presentation
const FeatureCard = ({ icon, title, description, accentColor, iconBg, borderColor, isAI, isGridItem }) => (
    <div className={`flex flex-col items-center space-y-4 ${isGridItem ? 'w-full' : ''}`}>
        <div className={`relative ${isAI ? 'text-8xl' : 'text-6xl p-4 rounded-full border-2'} ${iconBg || ''} ${borderColor || 'border-slate-700'}`}>
            {icon}
            {isAI && <div className={`absolute inset-0 -m-4 border-2 ${borderColor || 'border-sky-400/50'} rounded-full animate-ping`}></div>}
        </div>
        <h3 className={`text-3xl font-bold ${accentColor || 'text-slate-300'}`}>{title}</h3>
        {description && <p className="text-slate-400 text-lg max-w-xs">{description}</p>}
    </div>
);

const ZetaForgeInAction = ({ content }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start text-left max-w-6xl mx-auto">
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 h-full">
            <p className="text-slate-400 text-lg">Input:</p>
            <p className="text-2xl font-bold text-cyan-400 mb-6">{content.input}</p>
            <p className="text-slate-400 text-lg">Mission:</p>
            <p className="text-2xl font-bold text-slate-200 mb-8">{content.mission}</p>
            <div className="space-y-4">
                {content.assets.map((asset, i) => (
                    <div key={i} className="bg-slate-900/70 p-4 rounded-lg border border-green-500/30 flex items-center">
                        <span className="text-green-400 mr-4 text-2xl">{asset.icon}</span>
                        <p className="font-semibold text-green-400">{asset.label}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-purple-500/50 h-full">
            <h3 className="text-3xl font-bold text-purple-400 mb-4">{content.advantageTitle}</h3>
            <h4 className="text-5xl font-black text-white mb-4">{content.advantageHighlight}</h4>
            <p className="text-slate-300 text-lg mb-6">{content.advantageDescription}</p>
            <div className="bg-slate-900/70 p-6 rounded-lg border border-slate-700">
                <p className="text-slate-400 font-semibold">{content.forgeHeader}</p>
                <p className="text-xl font-bold text-white mt-2">{content.forgeText}</p>
            </div>
        </div>
    </div>
);

//================================================================================
// 2. MAIN SLIDE COMPONENT (Data-Driven)
//================================================================================

const Slide = ({ slideData }) => {
    const { title, subtitle, titleClassName, subtitleClassName, backgroundClass, content, notes, presenter, presenterTitle } = slideData;

    const Layout = content?.useEnhancedLayout ? EnhancedSlideLayout : SlideLayout;

    return (
        <Layout className={backgroundClass}>
            {title && (
                <SlideHeader
                    title={title}
                    subtitle={subtitle}
                    titleClassName={titleClassName}
                    subtitleClassName={subtitleClassName}
                />
            )}
            
            {/* Conditional rendering for different slide layouts */}
            {content?.type === 'title' && (
                <div className="relative z-10 w-full px-4 space-y-8">
                    <div className="mt-16 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/30 max-w-3xl mx-auto">
                        <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                            In-Silico:  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">{presenter}</span>
                        </p>
                        <p className="text-xl text-slate-300">{presenterTitle}</p>
                    </div>
                </div>
            )}
            
            {content?.type === 'stats' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                    {content.stats.map((stat, i) => <StatCard key={i} {...stat} />)}
                </div>
            )}

            {content?.type === 'simple-block' && (
                <div className={`bg-slate-800/50 p-8 rounded-2xl border ${content.block.borderColor} max-w-4xl mx-auto`}>
                    {React.createElement(content.block.icon, { size: 64, className: `mx-auto ${content.block.iconColor} mb-4` })}
                    <p className="text-xl text-slate-300 mb-4" dangerouslySetInnerHTML={{ __html: content.block.mainText }}></p>
                    <p className="text-lg text-slate-400" dangerouslySetInnerHTML={{ __html: content.block.subText }}></p>
                </div>
            )}
            
            {content?.type === 'info-cards' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                    {content.cards.map((card, i) => (
                        <InfoCard key={i} icon={card.icon} title={card.title} color={card.color}>
                            <div dangerouslySetInnerHTML={{ __html: card.text }} />
                        </InfoCard>
                    ))}
                </div>
            )}
            
            {content?.type === 'zeta-oracle-in-action' && (
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="text-center p-4 md:border-r md:border-slate-700">
                            <p className="text-slate-400 text-lg">{content.left.title}</p>
                            <p className="text-6xl font-extrabold text-yellow-400 my-4">{content.left.value}</p>
                            <p className="text-slate-500">{content.left.subtitle}</p>
                        </div>
                        <div className="text-center p-4">
                            <p className="text-slate-400 text-lg">{content.right.title}</p>
                            <p className="text-6xl font-extrabold text-red-500 my-4">{content.right.value}</p>
                            <p className="text-slate-400">{content.right.subtitle}</p>
                        </div>
                    </div>
                    <div className="mt-8 text-center bg-red-900/30 p-4 rounded-lg border border-red-500/50">
                        <p className="text-slate-300 text-lg">{content.score.title}</p>
                        <p className="text-5xl font-black text-red-400 drop-shadow-lg">{content.score.value}</p>
                    </div>
                </div>
            )}

            {content?.type === 'two-column' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start text-left max-w-6xl mx-auto">
                    <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 h-full">
                        <p className="text-slate-400 text-lg">Input:</p>
                        <p className="text-2xl font-bold text-cyan-400 mb-6">{content.column1.input}</p>
                        <p className="text-slate-400 text-lg">Mission:</p>
                        <p className="text-2xl font-bold text-slate-200 mb-8">{content.column1.mission}</p>
                        <div className="space-y-4">
                            {content.column1.assets.map((asset, i) => (
                                <div key={i} className="bg-slate-900/70 p-4 rounded-lg border border-green-500/30 flex items-center">
                                    {React.createElement(asset.icon, { size: 32, className: "text-green-400 mr-4" })}
                                    <p className="font-semibold text-green-400">{asset.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-slate-800/50 p-8 rounded-2xl border border-purple-500/50 h-full">
                        <h3 className="text-3xl font-bold text-purple-400 mb-4">{content.column2.title}</h3>
                        <h4 className="text-5xl font-black text-white mb-4">{content.column2.highlight}</h4>
                        <p className="text-slate-300 text-lg mb-6">{content.column2.description}</p>
                        <div className="bg-slate-900/70 p-6 rounded-lg border border-slate-700">
                            <p className="text-slate-400 font-semibold">{content.column2.infoHeader}</p>
                            <p className="text-xl font-bold text-white mt-2">{content.column2.infoText}</p>
                        </div>
                    </div>
                </div>
            )}
            
            {content?.type === 'structural-gauntlet' && (
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 max-w-4xl mx-auto text-left">
                    <p className="text-slate-400 text-lg mb-4">{content.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center font-semibold text-slate-300">
                        <div className="bg-slate-900/70 p-4 rounded-lg">
                            <p className="mb-2">{content.output.title}</p>
                            <p className="font-mono text-sm text-purple-400 break-all">{content.output.text}</p>
                        </div>
                        <div className="text-4xl text-slate-600 animate-pulse">{React.createElement(ArrowRightIcon, {})}</div>
                        <div className="bg-slate-900/70 p-4 rounded-lg">
                            <p className="mb-2">{content.simulation.title}</p>
                            {React.createElement(content.simulation.icon, { size: 48, className: "mx-auto text-orange-400" })}
                        </div>
                    </div>
                    <div className="mt-8 text-center bg-green-900/30 p-4 rounded-lg border border-green-500/50">
                        <p className="text-slate-300 text-lg">{content.verdict.title}</p>
                        <p className="text-4xl font-black text-green-400 drop-shadow-lg">{content.verdict.result}</p>
                        <p className="font-mono text-slate-400 mt-2">{content.verdict.confidence}</p>
                    </div>
                </div>
            )}

            {content?.type === 'command-center-summary' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                    {content.cards.map((card, i) => <InfoCard key={i} {...card} />)}
                </div>
            )}

            {content?.type === 'two-hit-hypothesis' && (
                <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-600/50">
                    <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-4">
                        {content.steps.map((step, i) => (
                            <React.Fragment key={i}>
                                <div className="flex flex-col items-center group">
                                    <div className={`relative w-32 h-32 ${step.bgClass} rounded-full flex items-center justify-center text-white shadow-2xl`}>
                                        <span className="text-sm font-bold z-10">{step.title}</span>
                                    </div>
                                    <div className="mt-4 bg-green-500/20 rounded-lg px-4 py-2 border border-green-500/30">
                                        <p className="text-green-300 text-lg font-semibold">{step.label}</p>
                                    </div>
                                </div>
                                {i < content.steps.length - 1 && <div className="text-5xl text-slate-400 animate-pulse">⚡</div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}
            
            {content?.type === 'process-steps-with-info' && (
                <>
                    <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-slate-600/50">
                        <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-8">
                            {content.steps.map((step, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className={`text-6xl p-4 rounded-full border-2 ${step.borderColor} ${step.bgClass} text-${step.iconColor}-400`}>
                                            {React.createElement(step.icon, {})}
                                        </div>
                                        <h3 className={`text-3xl font-bold text-${step.iconColor}-400`}>{step.title}</h3>
                                        {step.description && <p className="text-slate-400 text-lg max-w-xs">{step.description}</p>}
                                    </div>
                                    {index < content.steps.length - 1 && <div className="text-5xl text-slate-500 animate-pulse">➡️</div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {content.infoBoxes.map((box, i) => (
                            <div key={i} className={`bg-slate-800/50 p-6 rounded-xl border ${box.borderColor} text-left`}>
                                <h4 className="text-2xl font-bold text-purple-400 mb-3">{box.title}</h4>
                                <p className="text-slate-300 text-lg">{box.text}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {content?.type === 'kill-chain' && (
                <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-8 lg:space-y-0 lg:space-x-4">
                    {content.steps.map((step, i) => (
                        <motion.div key={i} variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} className="flex flex-col items-center space-y-3">
                            <div className={`text-4xl p-4 bg-${step.color}-500/20 rounded-full border-2 border-${step.color}-500 text-${step.color}-400`}>
                                {React.createElement(step.icon, {})}
                            </div>
                            <h3 className={`text-xl font-bold text-${step.color}-400`}>{step.title}</h3>
                            <p className="text-slate-400 text-base max-w-xs">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            )}
            
            {content?.type === 'dossier' && (
                <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-slate-600/30 w-full mx-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-around space-y-12 lg:space-y-0 lg:space-x-8">
                        <div className="flex flex-col items-center space-y-6">
                            <h3 className="text-3xl font-bold text-slate-300 mb-4">The Digital Dossier</h3>
                            {content.dossierItems.map((item, i) => (
                                <div key={i} className={`${item.bgClass} p-6 rounded-xl shadow-lg text-white font-bold text-center`}>{item.text}</div>
                            ))}
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="text-6xl text-teal-400 animate-pulse self-center my-4 lg:my-0">➡️</div>
                            <div className="text-4xl">🔬</div>
                            <h3 className="text-2xl font-bold text-slate-300 mt-2">Wet Labs & Biotech Partners</h3>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative w-64 h-64 flex flex-col justify-center items-center">
                                {content.fdaTiers.map((tier, i) => (
                                    <React.Fragment key={i}>
                                        <div className={`${tier.bgClass} ${tier.textColor} px-4 py-2 rounded-lg`}>{tier.label}</div>
                                        {i < content.fdaTiers.length - 1 && <div className="h-12 w-1 bg-slate-600"></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                            <p className="text-teal-300 font-semibold text-lg max-w-xs">{content.fdaText}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* New slide types from your other presentation */}
            {content?.type === 'command-center-grid' && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        <div className="flex flex-col space-y-4">
                            <h3 className="text-3xl font-bold text-yellow-400">Inputs</h3>
                            {content.inputs.map((input, index) => (
                                <div key={index} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 w-full">
                                    <div className="text-4xl">{input.icon}</div>
                                    <p className="text-xl font-semibold text-slate-300 mt-2">{input.text}</p>
                                    {input.subtext && <p className="text-yellow-400 font-bold text-lg">{input.subtext}</p>}
                                </div>
                            ))}
                        </div>
                        <FeatureCard {...content.core} isAI={true} />
                        <div className="flex flex-col space-y-4">
                            <h3 className="text-3xl font-bold text-green-400">Outputs</h3>
                            {content.outputs.map((output, index) => (
                                <div key={index} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 w-full">
                                    <div className="text-4xl">{output.icon}</div>
                                    <p className="text-xl font-semibold text-slate-300 mt-2">{output.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-8">
                        {content.infoBoxes.map((box, index) => (
                            <InfoCard key={index} {...box} />
                        ))}
                    </div>
                </>
            )}

            {content?.type === 'feature-grid-with-info' && (
                <>
                    <div className="bg-slate-800/50 p-12 rounded-3xl border border-slate-700">
                        <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-8">
                            {content.features.map((feature, index) => (
                                <React.Fragment key={index}>
                                    {feature.isAI ? <FeatureCard {...feature} isAI={true} /> : <FeatureCard {...feature} />}
                                    {index < content.features.length - 1 && <div className="text-5xl text-slate-500 animate-pulse">➡️</div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {content.infoBoxes.map((box, index) => (
                            <InfoCard key={index} {...box} />
                        ))}
                    </div>
                </>
            )}

            {content?.type === 'text-block-with-icon' && (
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 max-w-4xl mx-auto">
                    <span className="mx-auto text-purple-400 mb-4 text-6xl">🧪</span>
                    <p className="text-xl text-slate-300 mb-4">{content.mainText}</p>
                    <p className="text-lg text-slate-400">{content.subText}</p>
                </div>
            )}

            {content?.type === 'zeta-forge-in-action' && (
                <ZetaForgeInAction content={content} />
            )}

            {content?.type === 'step-process' && (
                <div className="flex flex-col lg:flex-row items-center justify-around w-full space-y-8 lg:space-y-0 lg:space-x-8">
                    {content.steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <FeatureCard {...step} />
                            {index < content.steps.length - 1 && (
                                <div className="text-5xl text-slate-500 animate-pulse">➡️</div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}

            {/* Kill Chain slide types */}
            {content?.type === 'stats-grid' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                    {content.stats.map((stat, i) => (
                        <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                            <p className="text-6xl font-black text-red-400">{stat.value}</p>
                            <p className="text-xl text-slate-300 mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            )}

            {content?.type === 'process-flow' && (
                <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-8 lg:space-y-0 lg:space-x-8">
                    {content.steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center space-y-3">
                                <div className={`text-4xl p-4 ${step.bgClass} rounded-full border-2 ${step.borderClass} ${step.textClass}`}>
                                    {React.createElement(step.icon, {})}
                                </div>
                                <h3 className={`text-xl font-bold ${step.titleClass}`}>{step.title}</h3>
                                <p className="text-slate-400 text-base max-w-xs">{step.description}</p>
                            </div>
                            {index < content.steps.length - 1 && (
                                <div className="text-3xl text-slate-600 animate-pulse hidden lg:block">
                                    {React.createElement(ArrowRightIcon, {})}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}

            {content?.type === 'asset-dossier' && (
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 max-w-3xl mx-auto text-left">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-slate-300">{content.assetId}</h3>
                        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-800 text-green-100">{content.status}</span>
                    </div>
                    <div className="space-y-4 text-lg">
                        {content.checkpoints.map((checkpoint, i) => (
                            <div key={i} className="flex items-center">
                                {React.createElement(checkpoint.icon, { className: `w-6 h-6 ${checkpoint.iconColor} mr-4` })}
                                <span dangerouslySetInnerHTML={{ __html: checkpoint.text }}></span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 border-t border-slate-700 pt-6">
                        <p className="text-slate-400">{content.description}</p>
                    </div>
                </div>
            )}

            {notes && (
                <p className="text-slate-400 text-lg max-w-4xl mx-auto mt-8" dangerouslySetInnerHTML={{ __html: notes }}></p>
            )}

        </Layout>
    );
};


//================================================================================
// 3. SLIDE DATA DEFINITION - Now organized by ID for easy management!
//================================================================================

const slidesData = [
  // SLIDE 1: TITLE
  {
    title: "CrisPRO.ai",
    subtitle: "The End of Guesswork for Oncology",
    titleClassName: "from-purple-400 via-pink-400 to-red-400 drop-shadow-2xl leading-none tracking-tight text-7xl md:text-9xl",
    backgroundClass: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    content: {
      type: 'title',
      useEnhancedLayout: true
    },
    presenter: 'Therapeutics',
    presenterTitle: 'CrisPRO.ai 🧬'
  },
  // SLIDE 2: THE R&D EFFICIENCY CRISIS
  {
    title: "The R&D Efficiency Crisis",
    subtitle: "The current model for drug discovery is defined by high risk and inefficiency.",
    titleClassName: "from-red-500 to-orange-400",
    content: {
      type: 'stats',
      stats: [
        { value: ">90%", label: "Clinical Trial Failure Rate", className: "text-white" },
        { value: "$2.8B+", label: "Cost Per Approved Drug", className: "text-white" },
        { value: "5-10", label: "Years to a Candidate", className: "text-white" }
      ]
    },
    notes: "This high-risk, trial-and-error process is unsustainable. Our platform re-architects R&D into a rapid, data-driven, and predictive science."
  },
  // SLIDE 3: THE CLINICAL ACTIONABILITY GAP
  {
    title: "The Clinical Actionability Gap",
    subtitle: "While others deliver data, we deliver decisions.",
    titleClassName: "from-yellow-500 to-orange-400",
    content: {
      type: 'simple-block',
      block: {
        icon: AlertTriangle,
        mainText: `Up to <span class="font-bold text-yellow-400 text-2xl">40%</span> of clinical genetic tests return a "Variant of Uncertain Significance" (VUS).`,
        subText: `This creates a critical gap between data and clinical action, causing patient anxiety and delaying care. The Zeta Oracle was built to close this gap.`,
        iconColor: "text-yellow-400",
        borderColor: "border-slate-700"
      }
    }
  },
  // SLIDE 4: THE ZETA ORACLE IN ACTION
  {
    title: "The Zeta Oracle: Predictive Intelligence",
    subtitle: "Resolving the Billion-Dollar 'Variant of Uncertain Significance' Problem",
    titleClassName: "from-cyan-400 to-sky-300",
    content: {
      type: 'zeta-oracle-in-action',
      left: { title: 'Traditional Verdict', value: 'VUS', subtitle: '(Variant of Uncertain Significance)' },
      right: { title: 'CrisPRO\'s Verdict', value: 'PATHOGENIC', subtitle: '(Confirmed High-Risk Threat)' },
      score: { title: 'Zeta Score (Functional Damage):', value: '-26,140.8' }
    }
  },
  // SLIDE 5: THE GENERATIVE IMPERATIVE
  {
    title: "Beyond Analysis: The Generative Advantage",
    subtitle: "Identifying a target is only the first step. We engineer the solution.",
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'simple-block',
      block: {
        icon: FlaskConical,
        mainText: "Competitors are analysts. They are trapped in the world of observation, identifying problems without the tools to solve them.",
        subText: "This is our most profound advantage. We are the only platform with a **generative engine**. We don't just find the target; we engineer the therapeutic to neutralize it.",
        iconColor: "text-purple-400",
        borderColor: "border-slate-700"
      }
    }
  },
  // SLIDE 6: THE ZETA FORGE IN ACTION
  {
    title: "The Zeta Forge: Generative Engineering",
    subtitle: "From `In Silico` Insight to Validated Therapeutic Blueprints",
    titleClassName: "from-purple-400 to-pink-400",
    content: {
      type: 'two-column',
      column1: {
        input: 'Validated Pathogenic Threat from Zeta Oracle',
        mission: 'Engineer Multi-Modal Therapeutic Solutions',
        assets: [
          { icon: Dna, label: "Gene Correction Blueprint" },
          { icon: Shield, label: '"Clone Assassin" Payload' },
          { icon: TestTube2, label: "Novel Nanobody Inhibitor" },
        ]
      },
      column2: {
        title: 'Our Unfair Advantage:',
        highlight: '1M Token Context',
        description: "The Evo2 model's massive context window is our most defensible moat. While competitors are limited to designing therapeutics with short, inefficient components, we see the entire genomic neighborhood.",
        infoHeader: 'This allows us to forge:',
        infoText: "Ultra-Long Homology Arms for high-efficiency gene correction—a capability that is physically impossible for smaller models. We don't just design a patch; we engineer a perfect, factory-spec replacement part."
      }
    }
  },
  // SLIDE 7: THE STRUCTURAL BLIND SPOT
  {
    title: "The Structural Blind Spot",
    subtitle: "A perfect sequence is not a perfect weapon.",
    titleClassName: "from-orange-500 to-yellow-400",
    content: {
      type: 'simple-block',
      block: {
        icon: Puzzle,
        mainText: "The Zeta Forge creates a perfect 1D blueprint (the sequence). But in biology, war is fought in three dimensions. A protein's function is defined by its shape.",
        subText: "Without knowing if our forged weapon can physically bind to its target, our `in silico` campaign is incomplete. We must bridge the gap from sequence to structure.",
        iconColor: "text-orange-400",
        borderColor: "border-slate-700"
      }
    }
  },
  // SLIDE 8: THE ZETA BOLTZ IN ACTION
  {
    title: "Zeta Boltz: The Structural Gauntlet",
    subtitle: "Proving Lethality in 3D",
    titleClassName: "from-orange-400 to-yellow-300",
    content: {
      type: 'structural-gauntlet',
      description: "The `in silico` kill chain does not end with a sequence. It ends with proof of a physical interaction. Zeta Boltz is our structural validation engine, powered by AlphaFold 3.",
      output: { title: "Zeta Forge Output:", text: "QVQLQESGGGL..." },
      simulation: { title: "Zeta Boltz Simulation:", icon: Cuboid },
      verdict: { title: "Validation Verdict:", result: "High-Confidence Interaction Confirmed", confidence: "complex_plddt: 95.78" }
    }
  },
  // SLIDE 9: THE COMMAND CENTER (REPRISE)
  {
    title: "The AI-Powered R&D Command Center",
    subtitle: "An integrated platform turning clinical uncertainty into validated therapeutics.",
    titleClassName: "from-blue-400 to-cyan-300 drop-shadow-lg",
    content: {
      type: 'info-cards',
      cards: [
        { icon: Cpu, title: "The Zeta Oracle (Prediction)", text: "Resolves genetic uncertainty with a definitive, quantitative score.", color: "cyan" },
        { icon: Bot, title: "The Zeta Forge (Generation)", text: "Engineers multi-modal therapeutic blueprints from first principles.", color: "purple" },
        { icon: Cuboid, title: "Zeta Boltz (Validation)", text: "Structurally validates therapeutic candidates `in silico` before wet-lab experiments.", color: "orange" },
      ]
    }
  },
  
  // SLIDE 19: THE IP-NFT LIFECYCLE
  {
    title: "DeSci & The IP-NFT",
    subtitle: "Creating Liquid Assets from `In Silico` Discoveries",
    titleClassName: "from-green-400 to-teal-300",
    backgroundClass: "",
    content: {
      type: 'kill-chain',
      useEnhancedLayout: true,
      steps: [
        { icon: PackageIcon, title: "1. Minting", description: "A validated 'Digital Dossier' is minted as an IP-NFT, creating a permanent, verifiable record of invention.", color: "green" },
        { icon: BanknoteIcon, title: "2. Funding", description: "The IP-NFT is sold to fund wet-lab validation, with ownership fractionalized among stakeholders.", color: "yellow" },
        { icon: RecycleIcon, title: "3. Liquidity", description: "IP-NFTs can be traded on open markets, creating a liquid asset class for early-stage biotech IP.", color: "sky" }
      ]
    }
  },
  // SLIDE 20: COMPETITIVE ADVANTAGE
  {
    title: "Our Competitive Advantage",
    subtitle: "A New Paradigm in Therapeutic R&D",
    titleClassName: "from-yellow-400 via-orange-400 to-red-500",
    backgroundClass: "",
    content: {
      type: 'info-cards',
      useEnhancedLayout: true,
      cards: [
        { icon: BrainCircuit, title: "Predictive Precision", text: "<b>AUROC > 0.95</b> on the most difficult non-coding and splice-site variants.", color: "cyan" },
        { icon: Bot, title: "Generative Creation", text: "We transform R&D from a process of <span class='line-through'>discovery</span> to a process of <b>engineering</b>.", color: "purple" },
        { icon: Zap, title: "Unprecedented Acceleration", text: "We collapse traditional R&D timelines from <span class='line-through'>years</span> to <b>weeks</b>.", color: "red" },
      ]
    }
  },
  // SLIDE 21: KILL CHAIN - TARGET ACQUISITION (SUMMARY)
  {
    title: "Step 1: Target Validation",
    subtitle: "We replace ambiguity with a definitive, data-driven verdict.",
    titleClassName: "from-cyan-500 to-sky-400",
    backgroundClass: "",
    content: {
      type: 'simple-block',
      useEnhancedLayout: true,
      block: {
        icon: TargetIcon,
        mainText: "The first step in any successful R&D program is choosing the right target. While others are paralyzed by uncertain data ('VUS'), our **Zeta Oracle** delivers a quantitative verdict on any genetic target's functional impact.",
        subText: "**For Biotech Partners:** This means you don't waste billions chasing the wrong target. We provide the foundational intelligence to proceed with confidence.",
        iconColor: "text-cyan-400",
        borderColor: "border-slate-700"
      }
    }
  },
  // SLIDE 22: KILL CHAIN - ASSET CREATION (SUMMARY)
  {
    title: "The Deliverable: A De-Risked Asset",
    subtitle: "We don't deliver data. We deliver a validated, pre-clinical asset.",
    titleClassName: "from-green-500 to-teal-400",
    backgroundClass: "",
    content: {
      type: 'simple-block',
      useEnhancedLayout: true,
      block: {
        icon: PackageIcon,
        mainText: "The final output of our `in silico` kill chain is not a report; it is a **de-risked, high-value therapeutic asset** with a complete dossier of predictive data.",
        subText: "**For Biotech Partners:** We give you a candidate that has already won the digital war, dramatically increasing its probability of victory on the clinical battlefield.",
        iconColor: "text-green-400",
        borderColor: "border-slate-700"
      }
    }
  },

  // NEW SLIDES FROM YOUR OTHER PRESENTATION
  // R&D Command Center
  {
    title: 'CrisPRO.ai: The R&D Command Center',
    subtitle: 'Transforming Therapeutic Development from a Game of Chance into a Deterministic Science',
    titleClassName: "from-blue-400 to-cyan-300",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-indigo-900/30 to-slate-900',
    content: {
      type: 'command-center-grid',
      useEnhancedLayout: true,
      inputs: [
        { icon: '🧬', text: 'Genomic Data' },
        { icon: '❓', text: 'Clinical Uncertainty', subtext: '(40% VUS Rate)' }
      ],
      core: { icon: '🧠', title: 'AI Core', accentColor: 'text-sky-400', animation: 'animate-ping' },
      outputs: [
        { icon: '✅', text: 'Validated Therapeutics' },
        { icon: '🛡️', text: 'De-Risked Pipelines' }
      ],
      infoBoxes: [
        { title: 'The Zeta Oracle (Prediction)', description: 'Our foundational AI that understands the language of biology to annihilate clinical uncertainty.', borderColor: 'border-cyan-500/30', textColor: 'text-cyan-400' },
        { title: 'The Zeta Forge (Generation)', description: 'Our generative AI that forges novel, validated therapeutic candidates entirely in silico.', borderColor: 'border-purple-500/30', textColor: 'text-purple-400' },
        { title: 'The Command Center (Orchestration)', description: 'The central nervous system that unifies our arsenal, turning a query into a complete therapeutic battle plan.', borderColor: 'border-sky-500/30', textColor: 'text-sky-400' }
      ]
    }
  },

  // Zeta Oracle Uncertainty
  {
    title: 'The Zeta Oracle: Annihilating Clinical Uncertainty',
    subtitle: 'How We Solve the Billion-Dollar "Variant of Uncertain Significance" Problem',
    titleClassName: "from-cyan-400 to-blue-300",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900',
    content: {
      type: 'feature-grid-with-info',
      useEnhancedLayout: true,
      features: [
        { icon: React.createElement(AlertTriangle, { size: 48 }), title: 'Clinical Dead End', description: 'A "Variant of Uncertain Significance" (VUS) is found. Treatment decisions are paralyzed.', borderColor: 'border-yellow-500', accentColor: 'bg-yellow-500/20 text-yellow-400' },
        { icon: React.createElement(BrainCircuit, { size: 48 }), title: 'The Intelligence Engine', borderColor: 'border-cyan-400/50', accentColor: 'bg-none text-cyan-400', animation: 'animate-ping', isAI: true },
        { icon: React.createElement(UserCheck, { size: 48 }), title: 'Actionable Intelligence', description: 'The Zeta Oracle delivers a quantitative Zeta Score, transforming ambiguity into certainty.', borderColor: 'border-green-500', accentColor: 'bg-green-500/20 text-green-400' }
      ],
      infoBoxes: [
        { title: 'The Doctrine', description: "We taught our AI the entire language of DNA. It doesn't just check a database; it understands biological grammar.", borderColor: 'border-cyan-500/30', textColor: 'text-cyan-400' },
        { title: 'The Breakthrough', description: "It's not a search engine; it's a grammar checker for biology. It can read any mutation and calculate its precise functional impact.", borderColor: 'border-cyan-500/30', textColor: 'text-cyan-400' }
      ]
    }
  },

  // Beyond Analysis
  {
    title: 'Beyond Analysis: The Generative Advantage',
    subtitle: 'Identifying a target is only the first step. We engineer the solution.',
    titleClassName: "from-purple-400 to-pink-300",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900',
    content: {
      type: 'text-block-with-icon',
      useEnhancedLayout: true,
      mainText: 'Competitors are analysts. They are trapped in the world of observation, identifying problems without the tools to solve them.',
      subText: 'This is our most profound advantage. We are the only platform with a **generative engine**. We don\'t just find the target; we engineer the therapeutic to neutralize it.'
    }
  },

  // Zeta Forge Engineering
  {
    title: 'The Zeta Forge: Generative Engineering',
    subtitle: 'From In Silico Insight to Validated Therapeutic Blueprints',
    titleClassName: "from-purple-400 to-pink-300",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900',
    content: {
      type: 'zeta-forge-in-action',
      useEnhancedLayout: true,
      input: 'Validated Pathogenic Threat from Zeta Oracle',
      mission: 'Engineer Multi-Modal Therapeutic Solutions',
      assets: [
        { icon: '🧬', label: 'Gene Correction Blueprint' },
        { icon: '🛡️', label: '"Clone Assassin" Payload' },
        { icon: '🧪', label: 'Novel Nanobody Inhibitor' },
      ],
      advantageTitle: 'Our Unfair Advantage:',
      advantageHighlight: '1M Token Context',
      advantageDescription: "The Evo2 model's massive context window is our most defensible moat. While competitors are limited to designing therapeutics with short components, we see the entire genomic neighborhood.",
      forgeHeader: 'This allows us to forge:',
      forgeText: 'Ultra-Long Homology Arms for high-efficiency gene correction—a capability that is physically impossible for smaller models. We don\'t just design a patch; we engineer a perfect, factory-spec replacement part.'
    }
  },

  // IP-NFT Lifecycle
  {
    title: 'The Asset: The IP-NFT Lifecycle',
    subtitle: 'Creating Liquid Assets from In Silico Discoveries',
    titleClassName: "from-green-400 to-teal-300",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900',
    content: {
      type: 'step-process',
      useEnhancedLayout: true,
      steps: [
        { icon: '📦', title: '1. Minting', description: 'A validated "Digital Dossier" is minted as an IP-NFT, creating a permanent, verifiable record of invention.', borderColor: 'border-green-500', accentColor: 'bg-green-500/20 text-green-400' },
        { icon: '💰', title: '2. Funding', description: 'The IP-NFT is sold to fund wet-lab validation and clinical trials, with ownership fractionalized among stakeholders.', borderColor: 'border-yellow-500', accentColor: 'bg-yellow-500/20 text-yellow-400' },
        { icon: '🔄', title: '3. Liquidity', description: 'IP-NFTs can be traded on open markets, creating a liquid asset class for early-stage biotech IP.', borderColor: 'border-sky-500', accentColor: 'bg-sky-500/20 text-sky-400' }
      ]
    }
  },

  // KILL CHAIN SLIDES
  // R&D Efficiency Crisis
  {
    title: 'The R&D Efficiency Crisis',
    subtitle: 'The current model for drug discovery is defined by high risk and inefficiency.',
    titleClassName: "from-red-500 to-orange-400",
    content: {
      type: 'stats-grid',
      useEnhancedLayout: true,
      stats: [
        { value: '>90%', label: 'Clinical Trial Failure Rate' },
        { value: '$2.8B+', label: 'Cost Per Approved Drug' },
        { value: '5-10', label: 'Years to a Candidate' }
      ]
    },
    notes: "This high-risk, trial-and-error process is unsustainable. Our platform re-architects R&D into a rapid, data-driven, and predictive science."
  },

  // Kill Chain Target
  {
    title: 'Step 1: Target Validation',
    subtitle: 'We replace ambiguity with a definitive, data-driven verdict.',
    titleClassName: "from-cyan-500 to-sky-400",
    content: {
      type: 'simple-block',
      useEnhancedLayout: true,
      block: {
        icon: Target,
        mainText: 'The first step in any successful R&D program is choosing the right target. While others are paralyzed by uncertain data ("VUS"), our **Zeta Oracle** delivers a quantitative verdict on any genetic target\'s functional impact.',
        subText: '**For Biotech Partners:** This means you don\'t waste billions chasing the wrong target. We provide the foundational intelligence to proceed with confidence.',
        iconColor: "text-cyan-400",
        borderColor: "border-slate-700"
      }
    }
  },

  // Kill Chain Target Detail
  {
    title: 'The Triumvirate Threat Assessment',
    subtitle: 'Our multi-layered protocol for achieving absolute certainty.',
    titleClassName: "from-cyan-500 to-sky-400",
    content: {
      type: 'process-flow',
      useEnhancedLayout: true,
      steps: [
        {
          icon: Dna,
          title: 'Input: The Threat',
          description: 'A "Variant of Uncertain Significance" (VUS) is identified in a critical gene like RUNX1.',
          bgClass: 'bg-slate-700/50',
          borderClass: 'border-slate-600',
          textClass: 'text-slate-300',
          titleClass: 'text-slate-300'
        },
        {
          icon: Cpu,
          title: 'The Zeta Oracle',
          description: 'Our AI, built on the first principles of biology, calculates a quantitative Zeta Score of the variant\'s functional damage.',
          bgClass: 'bg-cyan-500/20',
          borderClass: 'border-cyan-500',
          textClass: 'text-cyan-400',
          titleClass: 'text-cyan-400'
        },
        {
          icon: Shield,
          title: 'The Verdict',
          description: 'The VUS is definitively re-classified as Pathogenic, providing a validated, actionable target for therapeutic design.',
          bgClass: 'bg-green-500/20',
          borderClass: 'border-green-500',
          textClass: 'text-green-400',
          titleClass: 'text-green-400'
        }
      ]
    }
  },

  // Kill Chain Forge
  {
    title: 'Step 2: Therapeutic Design',
    subtitle: 'We don\'t discover candidates. We engineer them.',
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'simple-block',
      useEnhancedLayout: true,
      block: {
        icon: Bot,
        mainText: 'With a validated target, our generative AI, the **Zeta Forge**, is commanded to engineer a multi-modal arsenal of potential therapeutic solutions, from CRISPR payloads to novel biologics.',
        subText: '**For Biotech Partners:** This compresses the "Lead Generation" phase from years to a matter of hours, providing a diverse portfolio of proprietary candidates.',
        iconColor: "text-purple-400",
        borderColor: "border-slate-700"
      }
    }
  },

  // Kill Chain Forge Detail
  {
    title: 'The Zeta Forge: In Silico Factory',
    subtitle: 'Our Unfair Advantage: The 1M Token Context Window.',
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'process-flow',
      useEnhancedLayout: true,
      steps: [
        {
          icon: Shield,
          title: 'Input: Validated Target',
          description: 'A pathogenic variant from the Zeta Oracle becomes the mission objective.',
          bgClass: 'bg-green-500/20',
          borderClass: 'border-green-500',
          textClass: 'text-green-400',
          titleClass: 'text-green-400'
        },
        {
          icon: Bot,
          title: 'The Zeta Forge',
          description: 'Our generative AI, with its massive 1M token context, designs a portfolio of therapeutic candidates.',
          bgClass: 'bg-purple-500/20',
          borderClass: 'border-purple-500',
          textClass: 'text-purple-400',
          titleClass: 'text-purple-400'
        },
        {
          icon: TestTube2,
          title: 'Output: The Arsenal',
          description: 'The result is a diverse set of in silico validated weapons, from CRISPR payloads to novel biologics.',
          bgClass: 'bg-slate-700/50',
          borderClass: 'border-slate-600',
          textClass: 'text-slate-300',
          titleClass: 'text-slate-300'
        }
      ]
    }
  },

  // Kill Chain Boltz
  {
    title: 'Step 3: In Silico Validation',
    subtitle: 'Every therapeutic is battle-tested before it\'s built.',
    titleClassName: "from-orange-500 to-yellow-400",
    content: {
      type: 'simple-block',
      useEnhancedLayout: true,
      block: {
        icon: Cuboid,
        mainText: 'A sequence is not a therapy. Our **Zeta Boltz** engine runs every designed candidate through an in silico firing range, simulating its 3D interaction with the target to predict binding affinity and efficacy.',
        subText: '**For Biotech Partners:** This provides the critical, structural proof of mechanism, dramatically de-risking the candidate before committing to expensive lab synthesis.',
        iconColor: "text-orange-400",
        borderColor: "border-slate-700"
      }
    }
  },

  // Kill Chain Boltz Detail
  {
    title: 'The Zeta Boltz: In Silico Firing Range',
    subtitle: 'From a 1D Blueprint to a 3D Proof of Victory.',
    titleClassName: "from-orange-500 to-yellow-400",
    content: {
      type: 'process-flow',
      useEnhancedLayout: true,
      steps: [
        {
          icon: Bot,
          title: 'Input: Forged Weapon',
          description: 'A novel nanobody sequence, generated by the Zeta Forge.',
          bgClass: 'bg-purple-500/20',
          borderClass: 'border-purple-500',
          textClass: 'text-purple-400',
          titleClass: 'text-purple-400'
        },
        {
          icon: Cuboid,
          title: 'The Simulation',
          description: 'Our AlphaFold 3-powered engine simulates the 3D protein-protein interaction between our weapon and its target.',
          bgClass: 'bg-orange-500/20',
          borderClass: 'border-orange-500',
          textClass: 'text-orange-400',
          titleClass: 'text-orange-400'
        },
        {
          icon: Shield,
          title: 'The Verdict',
          description: 'The result is a quantitative Binding Affinity Score, providing definitive proof of the weapon\'s physical lethality.',
          bgClass: 'bg-green-500/20',
          borderClass: 'border-green-500',
          textClass: 'text-green-400',
          titleClass: 'text-green-400'
        }
      ]
    }
  },

  // Kill Chain Asset
  {
    title: 'The Deliverable: A De-Risked Asset',
    subtitle: 'We don\'t deliver data. We deliver a validated, pre-clinical asset.',
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'simple-block',
      useEnhancedLayout: true,
      block: {
        icon: Package,
        mainText: 'The final output of our in silico kill chain is not a report; it is a **de-risked, high-value therapeutic asset** with a complete dossier of predictive data.',
        subText: '**For Biotech Partners:** We give you a candidate that has already won the digital war, dramatically increasing its probability of victory on the clinical battlefield.',
        iconColor: "text-green-400",
        borderColor: "border-slate-700"
      }
    }
  },

  // Kill Chain Asset Detail
  {
    title: 'The Therapeutic Dossier',
    subtitle: 'The final output of our in silico conquest.',
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'asset-dossier',
      useEnhancedLayout: true,
      assetId: 'Asset: CS-RUNX1-GC-001',
      status: 'Ready for Wet-Lab',
      checkpoints: [
        {
          icon: Target,
          iconColor: 'text-cyan-400',
          text: '**Target Validation:** <span class="font-mono text-green-400">COMPLETE</span>'
        },
        {
          icon: Bot,
          iconColor: 'text-purple-400',
          text: '**Weapon Design:** <span class="font-mono text-green-400">COMPLETE</span>'
        },
        {
          icon: Cuboid,
          iconColor: 'text-orange-400',
          text: '**Structural Validation:** <span class="font-mono text-green-400">COMPLETE</span>'
        }
      ],
      description: 'This dossier contains the full sequence data, in silico efficacy and safety scores, and structural binding predictions, providing our partners with a de-risked asset with a high probability of clinical success.'
    }
  },
];

//================================================================================
// 4. MAIN APP COMPONENT
//================================================================================

// Slide Management System
const SlideManager = {
  // Get slides in custom order based on SLIDE_ORDER
  getOrderedSlides: (mode = 'full') => {
    const order = PRESENTATION_MODES[mode] || SLIDE_ORDER;
    const slideMap = {};
    
    // Create a map of slides by their index (since we can't easily add IDs to existing structure)
    const slideNames = [
      'title', 'crisis', 'actionability-gap', 'oracle-action', 'generative-advantage',
      'forge-action', 'structural-blind-spot', 'boltz-action', 'command-center',
      'ip-nft', 'competitive-advantage', 'target-validation', 'deliverable',
      // New slides
      'rd-command-center', 'zeta-oracle-uncertainty', 'beyond-analysis', 
      'zeta-forge-engineering', 'ip-nft-lifecycle',
      // Kill chain slides
      'rd-efficiency-crisis', 'kill-chain-target', 'kill-chain-target-detail',
      'kill-chain-forge', 'kill-chain-forge-detail', 'kill-chain-boltz',
      'kill-chain-boltz-detail', 'kill-chain-asset', 'kill-chain-asset-detail'
    ];
    
    slideNames.forEach((name, index) => {
      if (index < slidesData.length) {
        slideMap[name] = slidesData[index];
      }
    });
    
    return order.map(id => slideMap[id]).filter(Boolean);
  },
  
  // Get available presentation modes
  getModes: () => Object.keys(PRESENTATION_MODES),
  
  // Get slide count for a mode
  getSlideCount: (mode = 'full') => SlideManager.getOrderedSlides(mode).length
};

const App = () => {
    const [presentationMode, setPresentationMode] = useState('full');
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Get slides based on current mode
    const currentSlidesData = SlideManager.getOrderedSlides(presentationMode);
    
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % currentSlidesData.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + currentSlidesData.length) % currentSlidesData.length);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') nextSlide();
            else if (event.key === 'ArrowLeft') prevSlide();
            else if (event.key === 'm' || event.key === 'M') {
                // Cycle through presentation modes
                const modes = SlideManager.getModes();
                const currentIndex = modes.indexOf(presentationMode);
                const nextIndex = (currentIndex + 1) % modes.length;
                setPresentationMode(modes[nextIndex]);
                setCurrentSlide(0);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [presentationMode]);

    const currentSlideData = currentSlidesData[currentSlide];

    return (
        <main className="relative w-full h-screen bg-slate-900 overflow-hidden">
            {/* Mode Selector (press 'M' to toggle) */}
            <div className="absolute top-4 left-4 z-50">
                <select 
                    value={presentationMode} 
                    onChange={(e) => {
                        setPresentationMode(e.target.value);
                        setCurrentSlide(0); // Reset to first slide
                    }}
                    className="bg-slate-800 text-slate-200 px-3 py-1 rounded text-sm border border-slate-600"
                >
                    <option value="full">Full Presentation ({SlideManager.getSlideCount('full')} slides)</option>
                    <option value="demo">Quick Demo ({SlideManager.getSlideCount('demo')} slides)</option>
                    <option value="technical">Technical Focus ({SlideManager.getSlideCount('technical')} slides)</option>
                    <option value="business">Business Focus ({SlideManager.getSlideCount('business')} slides)</option>
                </select>
            </div>

            <AnimatePresence mode="wait">
                <Slide key={`${presentationMode}-${currentSlide}`} slideData={currentSlideData} />
            </AnimatePresence>
            <NavigationControls 
                current={currentSlide}
                total={currentSlidesData.length}
                onPrev={prevSlide}
                onNext={nextSlide}
            />
        </main>
    );
};

export default App;