import React from 'react';

type Candidate = {
	id: string;
	score: number; // match to objective
	qc: { synteny: number; dinucKL: number };
	notes?: string;
};

type Props = {
	candidates: readonly Candidate[];
	className?: string;
	title?: string;
};

const fmt = (n: number) => n.toFixed(3);

const CandidateTable: React.FC<Props> = ({ candidates, className, title = 'Top Designs' }) => (
	<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
		<div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>
		<div className="overflow-x-auto">
			<table className="min-w-full text-sm">
				<thead>
					<tr className="text-left text-slate-600 dark:text-slate-300">
						<th className="px-2 py-1">ID</th>
						<th className="px-2 py-1">Score</th>
						<th className="px-2 py-1">Synteny</th>
						<th className="px-2 py-1">Dinuc KL</th>
						<th className="px-2 py-1">Notes</th>
					</tr>
				</thead>
				<tbody>
					{candidates.map((c, i) => (
						<tr key={i} className="border-t border-slate-100 dark:border-slate-700">
							<td className="px-2 py-1 font-mono text-slate-800 dark:text-slate-100">{c.id}</td>
							<td className="px-2 py-1 font-mono">{fmt(c.score)}</td>
							<td className="px-2 py-1 font-mono">{fmt(c.qc.synteny)}</td>
							<td className="px-2 py-1 font-mono">{fmt(c.qc.dinucKL)}</td>
							<td className="px-2 py-1 text-slate-700 dark:text-slate-200">{c.notes || '—'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	</div>
);

export default CandidateTable; 

 
 
 
 