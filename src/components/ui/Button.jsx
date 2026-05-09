const variants = {
  primary:  'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-200',
  secondary:'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-200',
  ghost:    'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-200',
  success:  'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-200',
  danger:   'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-200',
  subtle:   'bg-brand-50 text-brand-700 hover:bg-brand-100 focus:ring-brand-200',
};

const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  leftIcon,
  rightIcon,
  children,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition
                  focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed
                  ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
