import { useApp } from '../../contexts/AppContext.jsx';
import Avatar from '../ui/Avatar.jsx';
import { IconBell, IconGlobe, IconMenu, IconSearch, IconSun, IconMoon, IconMonitor } from '../ui/Icons.jsx';

function ThemeToggle() {
  const { theme, setTheme } = useApp();
  const opts = [
    { v: 'light',  Icon: IconSun     },
    { v: 'dark',   Icon: IconMoon    },
    { v: 'system', Icon: IconMonitor },
  ];
  return (
    <div className="flex h-9 items-center gap-0.5 rounded-lg border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-800">
      {opts.map(({ v, Icon }) => {
        const active = theme === v;
        return (
          <button
            key={v}
            onClick={() => setTheme(v)}
            className={`grid h-7 w-7 place-items-center rounded-md transition ${
              active
                ? 'bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
            aria-label={`Theme: ${v}`}
            title={v}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}

export default function Topbar({ onOpenSidebar }) {
  const { lang, setLang, t, user } = useApp();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 lg:px-6">
      <button
        onClick={onOpenSidebar}
        className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        aria-label="Open menu"
      >
        <IconMenu className="h-5 w-5" />
      </button>

      <div className="relative hidden md:block flex-1 max-w-md">
        <IconSearch className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
        <input
          placeholder={t.common.search}
          className="input-base ps-9 h-10 bg-slate-50 dark:bg-slate-800"
        />
      </div>

      <div className="ms-auto flex items-center gap-1.5">
        <ThemeToggle />

        <button
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 h-9 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          <IconGlobe className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          {lang === 'en' ? 'العربية' : 'English'}
        </button>

        <button className="relative grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Notifications">
          <IconBell className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          <span className="absolute top-2 end-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </button>

        <div className="mx-2 h-6 w-px bg-slate-200 dark:bg-slate-700" />

        <button className="flex items-center gap-2.5 rounded-lg p-1 pe-2 hover:bg-slate-50 dark:hover:bg-slate-800">
          <Avatar user={user} size="sm" />
          <div className="hidden sm:block text-start leading-tight">
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">{user?.name[lang]}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">{user?.title[lang]}</div>
          </div>
        </button>
      </div>
    </header>
  );
}
