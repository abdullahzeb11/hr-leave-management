import { useApp, formatDate } from '../../contexts/AppContext.jsx';
import Avatar from '../ui/Avatar.jsx';
import Badge from '../ui/Badge.jsx';

const statusTone = { approved: 'approved', pending: 'pending', rejected: 'rejected' };

export default function LeaveTable({ rows, showEmployee = false, actions }) {
  const { t, lang, leaveTypeMeta, users } = useApp();

  if (!rows || rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-10 text-center dark:border-slate-700 dark:bg-slate-800/40">
        <p className="text-sm text-slate-500 dark:text-slate-400">{t.common.noResults}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto scroll-thin">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-start text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {showEmployee && <th className="px-4 py-3 text-start">{t.common.employee}</th>}
            <th className="px-4 py-3 text-start">{t.common.type}</th>
            <th className="px-4 py-3 text-start">{t.common.from} – {t.common.to}</th>
            <th className="px-4 py-3 text-start">{t.common.days}</th>
            <th className="px-4 py-3 text-start">{t.common.reason}</th>
            <th className="px-4 py-3 text-start">{t.common.status}</th>
            {actions && <th className="px-4 py-3 text-end">{t.common.actions}</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map(r => {
            const meta = leaveTypeMeta[r.type];
            const employee = users.find(u => u.id === r.userId);
            return (
              <tr key={r.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                {showEmployee && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar user={employee} size="sm" />
                      <div className="leading-tight">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{employee?.name[lang]}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{employee?.title[lang]}</div>
                      </div>
                    </div>
                  </td>
                )}
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.color}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                    {t.leaveTypes[r.type]}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                  <div className="text-sm">{formatDate(r.from, lang)}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">→ {formatDate(r.to, lang)}</div>
                </td>
                <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{r.days}</td>
                <td className="px-4 py-3 max-w-[220px] truncate text-slate-600 dark:text-slate-400" title={r.reason}>{r.reason || '—'}</td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone[r.status]}>
                    {t.common[r.status]}
                  </Badge>
                </td>
                {actions && (
                  <td className="px-4 py-3 text-end">
                    {actions(r)}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
