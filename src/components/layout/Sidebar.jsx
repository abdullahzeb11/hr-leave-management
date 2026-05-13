import { useApp } from '../../contexts/AppContext.jsx';
import {
  IconHome, IconClipboard, IconPlus, IconUsers, IconCalendar, IconLogout, IconSparkle, IconX,
} from '../ui/Icons.jsx';

const employeeNav = [
  { id: 'dashboard',  icon: IconHome,      key: 'dashboard' },
  { id: 'my-leaves',  icon: IconClipboard, key: 'myLeaves' },
  { id: 'new',        icon: IconPlus,      key: 'newRequest' },
  { id: 'calendar',   icon: IconCalendar,  key: 'calendar' },
];
const managerExtra = [
  { id: 'approvals',  icon: IconClipboard, key: 'approvals' },
  { id: 'team',       icon: IconUsers,     key: 'team' },
];

export default function Sidebar({ open, onClose }) {
  const { t, route, setRoute, user, logout } = useApp();
  const isManager = user?.role === 'manager';
  const items = [
    employeeNav[0],
    ...(isManager ? managerExtra : []),
    employeeNav[1],
    employeeNav[2],
    employeeNav[3],
  ];

  const navContent = (
    <>
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md">
            <IconSparkle className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{t.appName}</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">{t.tagline}</div>
          </div>
        </div>
        <button className="lg:hidden rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={onClose} aria-label="Close">
          <IconX className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {items.map(item => {
          const active = route === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => { setRoute(item.id); onClose?.(); }}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition
                ${active
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'}`}
            >
              <Icon className={`h-[18px] w-[18px] ${active ? 'text-brand-600 dark:text-brand-300' : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'}`} />
              <span className="flex-1 text-start">{t.nav[item.key]}</span>
              {active && <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-3 dark:border-slate-800">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          <IconLogout className="h-[18px] w-[18px] text-slate-400 dark:text-slate-500" />
          {t.nav.logout}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex h-screen w-64 flex-col border-e border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {navContent}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60" onClick={onClose} />
          <aside className="absolute inset-y-0 start-0 flex h-full w-72 flex-col bg-white shadow-xl dark:bg-slate-900">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
