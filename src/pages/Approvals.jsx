import { useMemo, useState } from 'react';
import { useApp } from '../contexts/AppContext.jsx';
import { Card, CardBody, CardHeader } from '../components/ui/Card.jsx';
import LeaveTable from '../components/leave/LeaveTable.jsx';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/ui/Modal.jsx';
import { Textarea } from '../components/ui/Input.jsx';
import { IconCheck, IconX } from '../components/ui/Icons.jsx';

export default function Approvals() {
  const { t, user, users, requests, decideRequest } = useApp();
  const [pending, setPending] = useState({ open: false, decision: null, request: null });
  const [note, setNote] = useState('');

  const teamIds = useMemo(() => users.filter(u => u.managerId === user.id).map(u => u.id), [users, user.id]);
  const rows = useMemo(
    () => requests
      .filter(r => teamIds.includes(r.userId) && r.status === 'pending')
      .sort((a, b) => (a.submittedAt > b.submittedAt ? 1 : -1)),
    [requests, teamIds]
  );

  const allRows = useMemo(
    () => requests
      .filter(r => teamIds.includes(r.userId) && r.status !== 'pending')
      .sort((a, b) => (b.decidedAt > a.decidedAt ? 1 : -1))
      .slice(0, 10),
    [requests, teamIds]
  );

  const openDecision = (request, decision) => { setPending({ open: true, decision, request }); setNote(''); };
  const close = () => setPending({ open: false, decision: null, request: null });
  const confirm = () => {
    decideRequest(pending.request.id, pending.decision, note);
    close();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t.approvals.title}</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.approvals.subtitle}</p>
      </div>

      <Card>
        <CardHeader title={t.approvals.title} subtitle={`${rows.length} ${t.common.pending.toLowerCase()}`} />
        <CardBody className="p-0">
          {rows.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">{t.approvals.empty}</p>
            </div>
          ) : (
            <LeaveTable
              rows={rows}
              showEmployee
              actions={(r) => (
                <div className="flex justify-end gap-1.5">
                  <Button
                    size="sm"
                    variant="success"
                    leftIcon={<IconCheck className="h-3.5 w-3.5" />}
                    onClick={() => openDecision(r, 'approved')}
                  >
                    {t.common.approve}
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    leftIcon={<IconX className="h-3.5 w-3.5" />}
                    onClick={() => openDecision(r, 'rejected')}
                  >
                    {t.common.reject}
                  </Button>
                </div>
              )}
            />
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title={`${t.common.all} ${t.nav.approvals}`} subtitle={t.dashboard.thisMonth} />
        <CardBody className="p-0">
          <LeaveTable rows={allRows} showEmployee />
        </CardBody>
      </Card>

      <Modal
        open={pending.open}
        onClose={close}
        title={pending.decision === 'approved' ? t.approvals.approveConfirm : t.approvals.rejectConfirm}
        footer={
          <>
            <Button variant="secondary" onClick={close}>{t.common.cancel}</Button>
            <Button
              variant={pending.decision === 'approved' ? 'success' : 'danger'}
              onClick={confirm}
            >
              {pending.decision === 'approved' ? t.common.approve : t.common.reject}
            </Button>
          </>
        }
      >
        <Textarea
          label={t.approvals.noteOptional}
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Modal>
    </div>
  );
}
