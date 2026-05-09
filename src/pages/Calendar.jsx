import { useMemo, useState } from 'react';
import { useApp } from '../contexts/AppContext.jsx';
import { Card, CardBody, CardHeader } from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';

function getMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const startDow = first.getDay(); // 0 Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function CalendarPage() {
  const { t, lang, user, users, requests, leaveTypeMeta } = useApp();
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });

  const isManager = user.role === 'manager';
  const visibleIds = useMemo(() => {
    if (isManager) return [user.id, ...users.filter(u => u.managerId === user.id).map(u => u.id)];
    return [user.id];
  }, [user, users, isManager]);

  const cells = useMemo(() => getMonthGrid(cursor.y, cursor.m), [cursor]);
  const monthLabel = `${t.months[cursor.m]} ${cursor.y}`;

  const leavesOn = (date) => {
    if (!date) return [];
    const iso = date.toISOString().slice(0, 10);
    return requests.filter(
      r => visibleIds.includes(r.userId) && r.status !== 'rejected' && r.from <= iso && r.to >= iso
    );
  };

  const prev = () => setCursor(c => c.m === 0 ? { y: c.y - 1, m: 11 } : { y: c.y, m: c.m - 1 });
  const next = () => setCursor(c => c.m === 11 ? { y: c.y + 1, m: 0 } : { y: c.y, m: c.m + 1 });

  const dayHeaders = lang === 'en'
    ? ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    : ['أحد','إثن','ثلا','أرب','خمي','جمع','سبت'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t.nav.calendar}</h1>
        <p className="mt-1 text-sm text-slate-500">{isManager ? t.team.subtitle : t.nav.myLeaves}</p>
      </div>

      <Card>
        <CardHeader
          title={monthLabel}
          action={
            <div className="flex gap-1.5">
              <Button size="sm" variant="secondary" onClick={prev}>‹</Button>
              <Button size="sm" variant="secondary" onClick={next}>›</Button>
            </div>
          }
        />
        <CardBody>
          <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {dayHeaders.map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-2">
            {cells.map((c, i) => {
              const today = c && c.toDateString() === new Date().toDateString();
              const items = leavesOn(c);
              return (
                <div
                  key={i}
                  className={`min-h-[88px] rounded-xl border p-2 text-start ${
                    c ? 'bg-white border-slate-200' : 'border-transparent bg-transparent'
                  }`}
                >
                  {c && (
                    <>
                      <div className={`mb-1 text-xs font-semibold ${today ? 'text-brand-600' : 'text-slate-700'}`}>
                        {c.getDate()}
                      </div>
                      <div className="space-y-1">
                        {items.slice(0, 2).map(r => (
                          <div
                            key={r.id}
                            className={`truncate rounded-md px-1.5 py-0.5 text-[10px] font-medium ${leaveTypeMeta[r.type].color}`}
                            title={`${users.find(u => u.id === r.userId)?.name[lang]} · ${t.leaveTypes[r.type]}`}
                          >
                            {users.find(u => u.id === r.userId)?.avatar} · {t.leaveTypes[r.type]}
                          </div>
                        ))}
                        {items.length > 2 && (
                          <div className="text-[10px] text-slate-500">+{items.length - 2}</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
