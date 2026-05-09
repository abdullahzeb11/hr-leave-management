import { useApp } from '../../contexts/AppContext.jsx';
import { IconCheck, IconX } from './Icons.jsx';

export default function Toast() {
  const { toast, setToast } = useApp();
  if (!toast) return null;
  const isSuccess = toast.kind === 'success';
  return (
    <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-white shadow-2xl">
        <span className={`grid h-6 w-6 place-items-center rounded-full ${isSuccess ? 'bg-emerald-500' : 'bg-brand-500'}`}>
          <IconCheck className="h-4 w-4" />
        </span>
        <span className="text-sm font-medium">{toast.message}</span>
        <button onClick={() => setToast(null)} className="ml-2 rounded p-1 hover:bg-white/10" aria-label="Close">
          <IconX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
