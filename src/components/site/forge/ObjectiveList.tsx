import React from 'react';

type PeakObjective = { type: 'peak'; start: number; end: number; value: 0 | 1 };

type TFObjective = { type: 'tf'; motif: string; start: number; end: number; weight?: number };

export type Objective = PeakObjective | TFObjective;

type Constraint = { label: string; value: string };

type Props = {
	objectives: readonly Objective[];
	constraints?: readonly Constraint[];
	className?: string;
	title?: string;
};

const chip = (text: string) => (
	<span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200">{text}</span>
);

const ObjectiveList: React.FC<Props> = ({ objectives, constraints, className, title = 'Design Objectives' }) => (
	<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
		<div className="flex items-center justify-between mb-2">
			<h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h4>
			{chip(`${objectives.length} objectives`)}
		</div>
		<div className="space-y-2">
			{objectives.map((o, i) => (
				<div key={i} className="text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2">
					{o.type === 'peak' ? chip('peak') : chip('tf')}
					<span className="font-mono">{o.type === 'peak' ? `${o.start}-${o.end} = ${o.value}` : `${o.motif} @ ${o.start}-${o.end}${typeof (o as TFObjective).weight === 'number' ? ` (w=${(o as TFObjective).weight})` : ''}`}</span>
				</div>
			))}
		</div>
		{constraints && constraints.length > 0 && (
			<div className="mt-4">
				<div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Constraints</div>
				<div className="flex flex-wrap gap-2">
					{constraints.map((c, i) => (
						<span key={i} className="px-2 py-0.5 text-xs rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">{c.label}: {c.value}</span>
					))}
				</div>
			</div>
		)}
	</div>
);

export default ObjectiveList; 