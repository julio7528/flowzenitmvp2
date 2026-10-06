type ProductIconName =
  | "mark"
  | "dashboard"
  | "tasks"
  | "agent"
  | "calendar"
  | "settings"
  | "admin"
  | "menu"
  | "person"
  | "empty"
  | "close";

export function ProductIcon({
  name,
  className = "icon",
}: {
  name: ProductIconName;
  className?: string;
}) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <use href={`#icon-${name}`} />
    </svg>
  );
}

export function ProductIconLibrary() {
  return (
    <svg className="icon-library" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <symbol id="icon-mark" viewBox="0 0 24 24"><path d="m5 12 4.5 4.5L19 7" /></symbol>
      <symbol id="icon-dashboard" viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="1.6" /><rect x="14" y="3" width="7" height="5" rx="1.6" /><rect x="14" y="11" width="7" height="10" rx="1.6" /><rect x="3" y="14" width="8" height="7" rx="1.6" /></symbol>
      <symbol id="icon-tasks" viewBox="0 0 24 24"><path d="M9 6h11M9 12h11M9 18h11" /><path d="m3.5 6 .8.8 1.7-1.7M3.5 12l.8.8 1.7-1.7M3.5 18l.8.8 1.7-1.7" /></symbol>
      <symbol id="icon-agent" viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" /><path d="m12 7 1.1 3.2 3.2 1.1-3.2 1.1L12 15.6l-1.1-3.2L7.7 11.3l3.2-1.1L12 7Z" /></symbol>
      <symbol id="icon-calendar" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></symbol>
      <symbol id="icon-settings" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2" /><path d="m19.4 15 .1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 0 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 0 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 0 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V2a1.7 1.7 0 0 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 0 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9Z" /></symbol>
      <symbol id="icon-admin" viewBox="0 0 24 24"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></symbol>
      <symbol id="icon-menu" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></symbol>
      <symbol id="icon-person" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" /><path d="M5 21a7 7 0 0 1 14 0" /></symbol>
      <symbol id="icon-empty" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M8 14h3m-3 3h8" /></symbol>
      <symbol id="icon-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" /></symbol>
    </svg>
  );
}
