import React from 'react';

type Preset = { id: string; name: string; description: string };

type Props = {
	presets: readonly Preset[];
	className?: string;
	title?: string;
};

const PresetsPanel: React.FC<Props> = ({ presets, className, title = 'Genome-scale presets' }) => (
	<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
		<div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>
		<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
			{presets.map((p) => (
				<div key={p.id} className="p-3 rounded border border-slate-100 dark:border-slate-700">
					<div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{p.name}</div>
					<div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.description}</div>
				</div>
			))}
		</div>
	</div>
);

export default PresetsPanel; 
 
 
 
 