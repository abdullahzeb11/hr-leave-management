import { useMemo } from 'react';
import { useApp, formatDate } from '../contexts/AppContext.jsx';
import { Card, CardBody, CardHeader } from '../components/ui/Card.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import Badge from '../components/ui/Badge.jsx';

export default function Team() {
  const { t, lang, user, users, requests } = useApp();
  const today = new Date().toISOString().slice(0, 10);
  const team = useMemo(() => users.filter(u => u.managerId === user.id), [users, user.id]);

  const memberInfo = (m) => {
    const onLeaveReq = requests.find(
      r => r.userId === m.id && r.status === 'approved' && r.from <= today && r.to >= today
    );
    const upcoming = requests
      .filter(r => r.userId === m.id && r.status !== 'rejected' && r.from > today)
      .sort((a, b) => (a.from > b.from ? 1 : -1))[0];
    return { onLeaveReq, upcoming };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t.team.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{t.team.subtitle}</p>
      </div>

      <Card>
        <CardHeader title={t.team.title} subtitle={`${team.length} ${t.team.title.toLowerCase()}`} />
        <CardBody className="p-0">
          <div className="grid gap-px bg-slate-100 sm:grid-cols-2 lg:grid-cols-3">
            {team.map(m => {
              const info = memberInfo(m);
              return (
                <div key={m.id} className="bg-white p-5">
                  <div className="flex items-start gap-3">
                    <Avatar user={m} size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-900 truncate">{m.name[lang]}</div>
                        <Badge tone={info.onLeaveReq ? 'pending' : 'approved'}>
                          {info.onLeaveReq ? t.team.onLeave : t.team.available}
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-500">{m.title[lang]}</div>
                      <div className="mt-1 text-[11px] text-slate-400">{m.department}</div>
                    </div>
                  </div>

                  <dl className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs">
                    {info.onLeaveReq && (
                      <div className="flex items-center justify-between">
                        <dt className="text-slate-500">{t.team.onLeave}</dt>
                        <dd className="font-medium text-slate-900">
                          {formatDate(info.onLeaveReq.from, lang)} → {formatDate(info.onLeaveReq.to, lang)}
                        </dd>
                      </div>
                    )}
                    {info.upcoming && (
                      <div className="flex items-center justify-between">
                        <dt className="text-slate-500">{t.dashboard.upcoming}</dt>
                        <dd className="font-medium text-slate-900">
                          {formatDate(info.upcoming.from, lang)}
                        </dd>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-500">Email</dt>
                      <dd className="font-mono text-[10px] text-slate-700 truncate">{m.email}</dd>
                    </div>
                  </dl>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
