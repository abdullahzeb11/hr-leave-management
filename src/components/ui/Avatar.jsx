const sizeMap = {
  xs: 'h-7 w-7 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

export default function Avatar({ user, size = 'md', className = '' }) {
  if (!user) return null;
  return (
    <div className={`inline-flex items-center justify-center rounded-full font-semibold text-white ${user.color || 'bg-slate-500'} ${sizeMap[size]} ${className}`}>
      {user.avatar}
    </div>
  );
}
