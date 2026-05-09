const tones = {
  approved: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  pending:  'bg-amber-50 text-amber-700 ring-amber-600/20',
  rejected: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  neutral:  'bg-slate-100 text-slate-700 ring-slate-500/20',
  brand:    'bg-brand-50 text-brand-700 ring-brand-600/20',
};

export default function Badge({ tone = 'neutral', children, className = '', dot }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${tones[tone]} ${className}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />}
      {children}
    </span>
  );
}
