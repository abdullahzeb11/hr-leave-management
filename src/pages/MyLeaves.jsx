import { useMemo, useState } from 'react';
import { useApp } from '../contexts/AppContext.jsx';
import { Card, CardBody, CardHeader } from '../components/ui/Card.jsx';
import LeaveTable from '../components/leave/LeaveTable.jsx';
import Button from '../components/ui/Button.jsx';
import { IconPlus } from '../components/ui/Icons.jsx';

const tabs = ['all', 'pending', 'approved', 'rejected'];

export default function MyLeaves() {
  const { t, user, requests, setRoute } = useApp();
  const [tab, setTab] = useState('all');

  const rows = useMemo(() => {
    return requests
      .filter(r => r.userId === user.id)
      .filter(r => tab === 'all' ? true : r.status === tab)
      .sort((a, b) => (b.submittedAt > a.submittedAt ? 1 : -1));
  }, [requests, user.id, tab]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t.nav.myLeaves}</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.team.subtitle}</p>
        </div>
        <Button leftIcon={<IconPlus className="h-4 w-4" />} onClick={() => setRoute('new')}>
          {t.nav.newRequest}
        </Button>
      </div>

      <Card>
        <CardHeader
          title={t.nav.myLeaves}
          action={
            <div className="flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
              {tabs.map(tk => (
                <button
                  key={tk}
                  onClick={() => setTab(tk)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                    tab === tk
                      ? 'bg-white text-slate-900 shadow-soft dark:bg-slate-700 dark:text-slate-100'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {t.common[tk]}
                </button>
              ))}
            </div>
          }
        />
        <CardBody className="p-0">
          <LeaveTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}
