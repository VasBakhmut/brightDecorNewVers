type P = { className?: string };

function Svg({ className, children }: P & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {children}
    </svg>
  );
}

export const IconHome = ({ className }: P) => (
  <Svg className={className}>
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-6h4v6" />
  </Svg>
);
export const IconBuilding = ({ className }: P) => (
  <Svg className={className}>
    <path d="M4 21V4a1 1 0 011-1h9a1 1 0 011 1v17" />
    <path d="M15 9h4a1 1 0 011 1v11" />
    <path d="M2 21h20" />
    <path d="M8 7h3M8 11h3M8 15h3" />
  </Svg>
);
export const IconLayers = ({ className }: P) => (
  <Svg className={className}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 12.5l9 5 9-5" />
    <path d="M3 17l9 5 9-5" />
  </Svg>
);
export const IconCalendar = ({ className }: P) => (
  <Svg className={className}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Svg>
);
export const IconShield = ({ className }: P) => (
  <Svg className={className}>
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
    <path d="M9 12l2 2 4-4" />
  </Svg>
);
export const IconAward = ({ className }: P) => (
  <Svg className={className}>
    <circle cx="12" cy="9" r="6" />
    <path d="M8.5 14.5L7 21l5-3 5 3-1.5-6.5" />
  </Svg>
);
export const IconDoc = ({ className }: P) => (
  <Svg className={className}>
    <path d="M6 3h9l4 4v14H6z" />
    <path d="M14 3v5h5M9 13h7M9 17h5" />
  </Svg>
);
export const IconPhone = ({ className }: P) => (
  <Svg className={className}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </Svg>
);
export const IconMail = ({ className }: P) => (
  <Svg className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Svg>
);
export const IconPin = ({ className }: P) => (
  <Svg className={className}>
    <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);
export const IconClock = ({ className }: P) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);
export const IconChevron = ({ className }: P) => (
  <Svg className={className}>
    <path d="M6 9l6 6 6-6" />
  </Svg>
);
export const IconArrow = ({ className }: P) => (
  <Svg className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);
export const IconCheck = ({ className }: P) => (
  <Svg className={className}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
);
