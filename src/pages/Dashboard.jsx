import { useMemo } from 'react';
import { useApp, formatDate } from '../contexts/AppContext.jsx';
import { Card, CardBody, CardHeader } from '../components/ui/Card.jsx';
import StatCard from '../components/dashboard/StatCard.jsx';
import BalanceBars from '../components/dashboard/BalanceBars.jsx';
import LeaveTable from '../components/leave/LeaveTable.jsx';
import Button from '../components/ui/Button.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import Badge from '../components/ui/Badge.jsx';
import { IconCalendar, IconClipboard, IconClock, IconUsers, IconPlus } from '../components/ui/Icons.jsx';

export default function Dashboard() {
  const { t, lang, user, users, requests, setRoute, leaveTypeMeta } = useApp();
  const isManager = user.role === 'manager';
  const today = new Date().toISOString().slice(0, 10);
  const year = new Date().getFullYear();

  const myRequests = useMemo(() => requests.filter(r => r.userId === user.id), [requests, user.id]);
  const teamIds = useMemo(() => users.filter(u => u.managerId === user.id).map(u => u.id), [users, user.id]);
  const teamMembers = useMemo(() => users.filter(u => u.managerId === user.id), [users, user.id]);
  const teamRequests = useMemo(() => requests.filter(r => teamIds.includes(r.userId)), [requests, teamIds]);

  const annualUsed = myRequests
    .filter(r => r.type === 'annual' && r.status === 'approved' && r.from.startsWith(String(year)))
    .reduce((acc, r) => acc + r.days, 0);
  const annualQuota = leaveTypeMeta.annual.quota;

  const myPending = myRequests.filter(r => r.status === 'pending').length;
  const onLeaveToday = (isManager ? teamRequests : requests).filter(
    r => r.status === 'approved' && r.from <= today && r.to >= today
  );
  const teamPending = teamRequests.filter(r => r.status === 'pending');

  const recent = (isManager ? teamRequests : myRequests)
    .slice()
    .sort((a, b) => (b.submittedAt > a.submittedAt ? 1 : -1))
    .slice(0, 5);

  const upcoming = myRequests
    .filter(r => r.status !== 'rejected' && r.from >= today)
    .sort((a, b) => (a.from > b.from ? 1 : -1))
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {t.dashboard.hello}, <span className="text-brand-600">{user.name[lang].split(' ')[0]}</span> 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t.dashboard.todayIs} {formatDate(today, lang)}
          </p>
        </div>
        <Button leftIcon={<IconPlus className="h-4 w-4" />} onClick={() => setRoute('new')}>
          {t.nav.newRequest}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={IconCalendar}
          tone="brand"
          label={t.dashboard.annualBalance}
          value={`${annualQuota - annualUsed} ${t.common.days}`}
          sub={`${annualUsed} ${t.dashboard.used} · ${annualQuota} ${t.dashboard.total}`}
        />
        <StatCard
          icon={IconClipboard}
          tone="emerald"
          label={t.dashboard.taken}
          value={annualUsed}
          sub={t.leaveTypes.annual}
        />
        <StatCard
          icon={IconClock}
          tone="amber"
          label={isManager ? t.dashboard.pendingApprovals : t.dashboard.pending}
          value={isManager ? teamPending.length : myPending}
          sub={t.dashboard.thisMonth}
        />
        <StatCard
          icon={IconUsers}
          tone="indigo"
          label={t.dashboard.teamOnLeave}
          value={onLeaveToday.length}
          sub={isManager ? `${teamMembers.length} ${t.team.title.toLowerCase()}` : ''}
        />
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title={t.dashboard.recent}
            subtitle={isManager ? t.team.title : t.nav.myLeaves}
            action={
              <Button variant="ghost" size="sm" onClick={() => setRoute(isManager ? 'approvals' : 'my-leaves')}>
                {t.common.viewAll}
              </Button>
            }
          />
          <CardBody className="p-0">
            <LeaveTable rows={recent} showEmployee={isManager} />
          </CardBody>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader title={t.dashboard.balanceByType} />
            <CardBody>
              <BalanceBars userId={user.id} />
            </CardBody>
          </Card>

          {isManager ? (
            <Card>
              <CardHeader
                title={t.dashboard.teamPanel}
                action={<Badge tone="brand">{teamMembers.length}</Badge>}
              />
              <CardBody className="space-y-3">
                {teamMembers.map(m => {
                  const onLeave = onLeaveToday.some(r => r.userId === m.id);
                  return (
                    <div key={m.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Avatar user={m} size="sm" />
                        <div className="leading-tight">
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{m.name[lang]}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">{m.title[lang]}</div>
                        </div>
                      </div>
                      <Badge tone={onLeave ? 'pending' : 'approved'}>
                        {onLeave ? t.team.onLeave : t.team.available}
                      </Badge>
                    </div>
                  );
                })}
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardHeader title={t.dashboard.upcoming} />
              <CardBody>
                {upcoming.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t.common.noResults}</p>
                ) : (
                  <ul className="space-y-3">
                    {upcoming.map(r => (
                      <li key={r.id} className="flex items-center gap-3">
                        <span className={`grid h-10 w-10 place-items-center rounded-lg ${leaveTypeMeta[r.type].color}`}>
                          <IconCalendar className="h-4 w-4" />
                        </span>
                        <div className="flex-1 leading-tight">
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{t.leaveTypes[r.type]}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {formatDate(r.from, lang)} → {formatDate(r.to, lang)}
                          </div>
                        </div>
                        <Badge tone={r.status === 'approved' ? 'approved' : 'pending'}>
                          {t.common[r.status]}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
