import { useState } from 'react';
import { useApp } from '../contexts/AppContext.jsx';
import { Input } from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import { IconSparkle, IconGlobe } from '../components/ui/Icons.jsx';

export default function Login() {
  const { lang, setLang, t, login } = useApp();
  const [email, setEmail] = useState('layla@leavely.io');
  const [password, setPassword] = useState('demo');
  const [error, setError] = useState('');

  const handle = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (!res.ok) setError(t.login.invalid);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      {/* Left brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-indigo-700 p-10 text-white">
        <div className="absolute -top-32 -end-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -start-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur">
            <IconSparkle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-base font-bold">{t.appName}</div>
            <div className="text-[11px] uppercase tracking-widest text-white/70">{t.tagline}</div>
          </div>
        </div>

        <div className="relative">
          <h1 className="text-3xl font-bold leading-tight">
            {lang === 'en'
              ? 'Plan time off with confidence.'
              : 'خطّط لإجازاتك بثقة.'}
          </h1>
          <p className="mt-4 max-w-md text-sm text-white/80">
            {lang === 'en'
              ? 'A modern leave management platform built for fast-moving teams. Track balances, request time off, and get manager approvals in seconds.'
              : 'منصة حديثة لإدارة الإجازات مصممة للفرق سريعة الحركة. تابع الأرصدة، اطلب إجازة، واحصل على موافقة المدير خلال ثوانٍ.'}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { v: '12K+', k: lang === 'en' ? 'employees' : 'موظف' },
              { v: '99.9%', k: lang === 'en' ? 'uptime'    : 'موثوقية' },
              { v: '< 2s',  k: lang === 'en' ? 'approvals' : 'موافقات' },
            ].map((s) => (
              <div key={s.v} className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <div className="text-xl font-bold">{s.v}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/70">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs text-white/70">{t.login.footer}</div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center justify-between">
            <div className="lg:hidden flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <IconSparkle className="h-5 w-5" />
              </div>
              <div className="font-bold text-slate-900">{t.appName}</div>
            </div>
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="ms-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 h-9 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <IconGlobe className="h-4 w-4 text-slate-500" />
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">{t.login.welcome}</h2>
          <p className="mt-1.5 text-sm text-slate-500">{t.login.subtitle}</p>

          <form onSubmit={handle} className="mt-8 space-y-4">
            <Input
              type="email"
              label={t.login.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <Input
              type="password"
              label={t.login.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              error={error}
            />
            <Button type="submit" size="lg" className="w-full">
              {t.login.submit}
            </Button>
          </form>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-700">{t.login.hint}</div>
            <div className="mt-2 grid gap-1 text-xs text-slate-600">
              <button
                type="button"
                onClick={() => { setEmail('layla@leavely.io'); setPassword('demo'); }}
                className="flex items-center justify-between rounded-md p-1.5 hover:bg-white"
              >
                <span>{t.login.employee}</span>
                <span className="font-mono text-[11px]">layla@leavely.io</span>
              </button>
              <button
                type="button"
                onClick={() => { setEmail('noura@leavely.io'); setPassword('demo'); }}
                className="flex items-center justify-between rounded-md p-1.5 hover:bg-white"
              >
                <span>{t.login.manager}</span>
                <span className="font-mono text-[11px]">noura@leavely.io</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
