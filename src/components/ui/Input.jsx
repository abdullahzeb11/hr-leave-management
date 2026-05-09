export function Input({ label, error, hint, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="label-base">{label}</label>}
      <input className={`input-base ${error ? 'border-rose-300 focus:ring-rose-100 focus:border-rose-500' : ''}`} {...props} />
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export function Textarea({ label, error, hint, className = '', rows = 3, ...props }) {
  return (
    <div className={className}>
      {label && <label className="label-base">{label}</label>}
      <textarea rows={rows} className={`input-base resize-none ${error ? 'border-rose-300' : ''}`} {...props} />
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export function Select({ label, error, options = [], placeholder, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="label-base">{label}</label>}
      <select className={`input-base bg-white pr-8 ${error ? 'border-rose-300' : ''}`} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
