import { useApp } from '../../contexts/AppContext.jsx';

export default function BalanceBars({ userId }) {
  const { t, requests, leaveTypeMeta } = useApp();
  const types = ['annual', 'sick', 'unpaid', 'hajj'];
  const year = new Date().getFullYear();

  return (
    <div className="space-y-4">
      {types.map(type => {
        const used = requests
          .filter(r => r.userId === userId && r.type === type && r.status === 'approved' && r.from.startsWith(String(year)))
          .reduce((acc, r) => acc + r.days, 0);
        const quota = leaveTypeMeta[type].quota;
        const pct = Math.min(100, Math.round((used / quota) * 100));
        return (
          <div key={type}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                <span className={`h-2 w-2 rounded-full ${leaveTypeMeta[type].dot}`} />
                {t.leaveTypes[type]}
              </div>
              <span className="text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-slate-100">{quota - used}</span> / {quota} {t.dashboard.remaining}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className={`h-full ${leaveTypeMeta[type].dot}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
