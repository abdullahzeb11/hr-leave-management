import { useMemo, useState } from 'react';
import { useApp, daysBetween, formatDate } from '../../contexts/AppContext.jsx';
import { Input, Textarea, Select } from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { IconUpload } from '../ui/Icons.jsx';

export default function LeaveRequestForm({ onSubmitted }) {
  const { t, lang, user, submitRequest, leaveTypeMeta } = useApp();
  const [type, setType] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});

  const days = useMemo(() => (from && to ? daysBetween(from, to) : 0), [from, to]);

  const typeOptions = Object.keys(leaveTypeMeta).map(k => ({
    value: k,
    label: t.leaveTypes[k],
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!type) next.type = t.request.errorType;
    if (!from || !to || daysBetween(from, to) <= 0) next.range = t.request.errorRange;
    setErrors(next);
    if (Object.keys(next).length) return;

    submitRequest({ userId: user.id, type, from, to, days, reason });
    setType(''); setFrom(''); setTo(''); setReason(''); setErrors({});
    onSubmitted?.();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-5">
        <Select
          label={t.request.type}
          placeholder={t.request.selectType}
          options={typeOptions}
          value={type}
          onChange={(e) => setType(e.target.value)}
          error={errors.type}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            type="date"
            label={t.request.from}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            error={errors.range}
          />
          <Input
            type="date"
            label={t.request.to}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <Textarea
          rows={4}
          label={t.request.reason}
          placeholder={t.request.reasonPh}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div>
          <label className="label-base">{t.request.attach}</label>
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300 dark:hover:bg-slate-800">
            <IconUpload className="h-5 w-5 text-slate-400 dark:text-slate-500" />
            <div>
              <div className="font-medium text-slate-700 dark:text-slate-200">Browse files</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t.request.attachHint}</div>
            </div>
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>

      <aside className="lg:col-span-1">
        <div className="sticky top-24 rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-50 to-white p-5 shadow-soft dark:border-slate-800 dark:from-brand-500/10 dark:to-slate-900">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.request.summary}</h4>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-slate-500 dark:text-slate-400">{t.common.type}</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{type ? t.leaveTypes[type] : '—'}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500 dark:text-slate-400">{t.common.from}</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{from ? formatDate(from, lang) : '—'}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500 dark:text-slate-400">{t.common.to}</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{to ? formatDate(to, lang) : '—'}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
              <dt className="text-slate-500 dark:text-slate-400">{t.request.duration}</dt>
              <dd className="text-base font-bold text-brand-700 dark:text-brand-300">
                {days} {days === 1 ? t.common.day : t.common.days}
              </dd>
            </div>
          </dl>

          <Button type="submit" className="mt-5 w-full">
            {t.request.submit}
          </Button>
        </div>
      </aside>
    </form>
  );
}
