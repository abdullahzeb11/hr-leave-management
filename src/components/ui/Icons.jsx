// Lightweight inline SVG icons. Stroke-based, 20x20 viewBox.
const base = { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const IconHome = (p) => (
  <svg {...base} {...p}><path d="M3 9l7-6 7 6v8a1 1 0 0 1-1 1h-3v-5H7v5H4a1 1 0 0 1-1-1V9z"/></svg>
);
export const IconCalendar = (p) => (
  <svg {...base} {...p}><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M3 8h14M7 2v4M13 2v4"/></svg>
);
export const IconPlus = (p) => (
  <svg {...base} {...p}><path d="M10 4v12M4 10h12"/></svg>
);
export const IconCheck = (p) => (
  <svg {...base} {...p}><path d="M4 10l4 4 8-8"/></svg>
);
export const IconX = (p) => (
  <svg {...base} {...p}><path d="M5 5l10 10M15 5L5 15"/></svg>
);
export const IconUsers = (p) => (
  <svg {...base} {...p}><circle cx="7" cy="7" r="3"/><path d="M2 17a5 5 0 0 1 10 0"/><circle cx="14" cy="8" r="2.5"/><path d="M13 17a4 4 0 0 1 5-3"/></svg>
);
export const IconClipboard = (p) => (
  <svg {...base} {...p}><rect x="5" y="4" width="10" height="13" rx="1.5"/><path d="M7 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M8 9h4M8 12h4"/></svg>
);
export const IconLogout = (p) => (
  <svg {...base} {...p}><path d="M12 4H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h7M9 10h8m0 0l-3-3m3 3l-3 3"/></svg>
);
export const IconSearch = (p) => (
  <svg {...base} {...p}><circle cx="9" cy="9" r="5"/><path d="M13 13l4 4"/></svg>
);
export const IconBell = (p) => (
  <svg {...base} {...p}><path d="M5 15h10l-1.5-2V9a3.5 3.5 0 0 0-7 0v4L5 15z"/><path d="M8 17a2 2 0 0 0 4 0"/></svg>
);
export const IconGlobe = (p) => (
  <svg {...base} {...p}><circle cx="10" cy="10" r="7"/><path d="M3 10h14M10 3a11 11 0 0 1 0 14M10 3a11 11 0 0 0 0 14"/></svg>
);
export const IconChevron = (p) => (
  <svg {...base} {...p}><path d="M6 8l4 4 4-4"/></svg>
);
export const IconClock = (p) => (
  <svg {...base} {...p}><circle cx="10" cy="10" r="7"/><path d="M10 6v4l3 2"/></svg>
);
export const IconSparkle = (p) => (
  <svg {...base} {...p}><path d="M10 3v3M10 14v3M3 10h3M14 10h3M5 5l2 2M13 13l2 2M5 15l2-2M13 7l2-2"/></svg>
);
export const IconMenu = (p) => (
  <svg {...base} {...p}><path d="M3 6h14M3 10h14M3 14h14"/></svg>
);
export const IconUpload = (p) => (
  <svg {...base} {...p}><path d="M4 13v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3M10 3v10M6 7l4-4 4 4"/></svg>
);
export const IconSun = (p) => (
  <svg {...base} {...p}><circle cx="10" cy="10" r="3.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M4.5 15.5l1.4-1.4M14.1 5.9l1.4-1.4"/></svg>
);
export const IconMoon = (p) => (
  <svg {...base} {...p}><path d="M16 11.5A6 6 0 1 1 8.5 4a5 5 0 0 0 7.5 7.5z"/></svg>
);
export const IconMonitor = (p) => (
  <svg {...base} {...p}><rect x="2.5" y="3.5" width="15" height="11" rx="1.5"/><path d="M7 17h6M10 14.5v2.5"/></svg>
);
