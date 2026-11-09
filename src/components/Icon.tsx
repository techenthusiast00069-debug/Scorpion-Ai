import type { ReactNode } from "react";

type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "arrow-down"
  | "search"
  | "globe"
  | "file"
  | "database"
  | "workflow"
  | "desktop"
  | "shield"
  | "lock"
  | "check"
  | "eye"
  | "menu"
  | "close"
  | "terminal"
  | "cpu"
  | "layers"
  | "clock"
  | "grid"
  | "sliders"
  | "users"
  | "memory"
  | "play"
  | "chevron-down"
  | "bolt"
  | "plus"
  | "command";

const paths: Record<IconName, ReactNode> = {
  "arrow-right": <path d="M4 12h15M13 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  "arrow-down": <path d="M12 4v15M6 13l6 6 6-6" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4.5 4.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5Z" />
    </>
  ),
  file: (
    <>
      <path d="M6 3.5h7.5L19 9v11.5H6Z" />
      <path d="M13 3.5V9h6" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
    </>
  ),
  workflow: (
    <>
      <rect x="3" y="4" width="6" height="5" rx="1" />
      <rect x="15" y="15" width="6" height="5" rx="1" />
      <rect x="3" y="15" width="6" height="5" rx="1" />
      <path d="M9 6.5h3.5a2 2 0 0 1 2 2V15M9 17.5h6" />
    </>
  ),
  desktop: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M9 20h6M12 16v4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 5.8v5.4c0 4.2 2.8 7.7 7 9.3 4.2-1.6 7-5.1 7-9.3V5.8Z" />
      <path d="m9 11.8 2.2 2.2L15.4 9.8" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10" width="15" height="10" rx="1.5" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  eye: (
    <>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="m7.5 9.5 3 2.5-3 2.5M13 15h4" />
    </>
  ),
  cpu: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="1" />
      <path d="M10 10h4v4h-4zM9 3v3.5M15 3v3.5M9 17.5V21M15 17.5V21M3 9h3.5M3 15h3.5M17.5 9H21M17.5 15H21" />
    </>
  ),
  layers: <path d="m12 3 9 5-9 5-9-5 9-5ZM3.5 12.5 12 17l8.5-4.5M3.5 16.5 12 21l8.5-4.5" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.4 2" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
    </>
  ),
  sliders: <path d="M4 7h9M17 7h3M4 12h3M11 12h9M4 17h9M17 17h3M13 5v4M7 10v4M13 15v4" />,
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.4c2.4.5 4 2.4 4 5.1" />
    </>
  ),
  memory: (
    <>
      <path d="M12 3.5 4.5 8v8L12 20.5 19.5 16V8Z" />
      <path d="m4.5 8 7.5 4.5L19.5 8M12 12.5v8" />
    </>
  ),
  play: <path d="M8 5.5 18 12 8 18.5Z" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  bolt: <path d="M13.5 2.5 4.5 13.5H11l-.5 8 9-11H13Z" />,
  command: <path d="M8 4a3 3 0 1 0 0 6h8a3 3 0 1 0 0-6M8 14h8M8 14a3 3 0 1 0 0 6h8a3 3 0 1 0 0-6M8 4v16M16 4v16" />,
};

export function Icon({
  name,
  size = 18,
  className = "",
  strokeWidth = 1.4,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
