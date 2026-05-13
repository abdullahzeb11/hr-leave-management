import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations.js';
import { users, initialRequests, leaveTypeMeta } from '../data/sampleData.js';

const AppContext = createContext(null);

const LANG_KEY = 'leavely.lang';
const USER_KEY = 'leavely.userId';
const THEME_KEY = 'leavely.theme';

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem(LANG_KEY) || 'en');
  const [userId, setUserId] = useState(() => localStorage.getItem(USER_KEY) || null);
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'system');
  const [requests, setRequests] = useState(initialRequests);
  const [route, setRoute] = useState('dashboard');
  const [toast, setToast] = useState(null);

  // Apply dir + lang to <html>
  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  // Apply theme (light/dark/system) to <html class="dark">
  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const isDark = theme === 'dark' || (theme === 'system' && mq.matches);
      root.classList.toggle('dark', isDark);
    };
    apply();
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'system') {
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    }
  }, [theme]);

  useEffect(() => {
    if (userId) localStorage.setItem(USER_KEY, userId);
    else localStorage.removeItem(USER_KEY);
  }, [userId]);

  // Auto-clear toast
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  const t = useMemo(() => translations[lang], [lang]);
  const currentUser = useMemo(() => users.find(u => u.id === userId) || null, [userId]);

  const login = useCallback((email, password) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found || (found.password && found.password !== password && password !== 'demo')) {
      return { ok: false };
    }
    setUserId(found.id);
    setRoute('dashboard');
    return { ok: true, user: found };
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setRoute('dashboard');
  }, []);

  const submitRequest = useCallback((req) => {
    const newReq = {
      ...req,
      id: `r${Date.now()}`,
      userId: req.userId || userId,
      status: 'pending',
      submittedAt: new Date().toISOString().slice(0, 10),
    };
    setRequests(prev => [newReq, ...prev]);
    setToast({ kind: 'success', message: translations[lang].request.success });
    return newReq;
  }, [userId, lang]);

  const decideRequest = useCallback((id, decision, note) => {
    setRequests(prev => prev.map(r =>
      r.id === id
        ? { ...r, status: decision, decidedBy: userId, decidedAt: new Date().toISOString().slice(0, 10), note }
        : r
    ));
    setToast({
      kind: decision === 'approved' ? 'success' : 'info',
      message: decision === 'approved' ? translations[lang].common.approved : translations[lang].common.rejected,
    });
  }, [userId, lang]);

  const value = {
    lang, setLang, t,
    theme, setTheme,
    user: currentUser, isAuthed: !!currentUser,
    login, logout,
    users,
    requests, submitRequest, decideRequest,
    leaveTypeMeta,
    route, setRoute,
    toast, setToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// Helpers
export function daysBetween(fromIso, toIso) {
  const a = new Date(fromIso); const b = new Date(toIso);
  if (isNaN(a) || isNaN(b)) return 0;
  return Math.max(0, Math.round((b - a) / 86400000) + 1);
}

export function formatDate(iso, lang = 'en') {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  const months = translations[lang].months;
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
