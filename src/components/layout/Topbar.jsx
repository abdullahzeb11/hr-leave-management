import { useState } from 'react';
import { useApp } from '../../contexts/AppContext.jsx';
import Avatar from '../ui/Avatar.jsx';
import { IconBell, IconGlobe, IconMenu, IconSearch } from '../ui/Icons.jsx';

export default function Topbar({ onOpenSidebar }) {
  const { lang, setLang, t, user } = useApp();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur lg:px-6">
      <button
        onClick={onOpenSidebar}
        className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
      >
        <IconMenu className="h-5 w-5" />
      </button>

      <div className="relative hidden md:block flex-1 max-w-md">
        <IconSearch className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          placeholder={t.common.search}
          className="input-base ps-9 h-10 bg-slate-50 border-slate-200"
        />
      </div>

      <div className="ms-auto flex items-center gap-1.5">
        <button
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 h-9 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          <IconGlobe className="h-4 w-4 text-slate-500" />
          {lang === 'en' ? 'العربية' : 'English'}
        </button>

        <button className="relative grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100" aria-label="Notifications">
          <IconBell className="h-5 w-5 text-slate-600" />
          <span className="absolute top-2 end-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </button>

        <div className="mx-2 h-6 w-px bg-slate-200" />

        <button
          onClick={() => setOpenMenu(o => !o)}
          className="flex items-center gap-2.5 rounded-lg p-1 pe-2 hover:bg-slate-50"
        >
          <Avatar user={user} size="sm" />
          <div className="hidden sm:block text-start leading-tight">
            <div className="text-xs font-semibold text-slate-900">{user?.name[lang]}</div>
            <div className="text-[10px] text-slate-500">{user?.title[lang]}</div>
          </div>
        </button>
      </div>
    </header>
  );
}
