import React from 'react';

export interface IconProps {
  size?: number;
  color?: string;
}

export const HomeIcon: React.FC<IconProps> = ({ size = 19, color = '#1B4332' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 11.5L12 4l9 7.5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" stroke={color} strokeWidth={2} strokeLinejoin="round" />
  </svg>
);

export const MembersIcon: React.FC<IconProps> = ({ size = 19, color = '#A79E86' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={9} cy={8} r={3.4} stroke={color} strokeWidth={2} />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <circle cx={17.5} cy={9} r={2.6} stroke={color} strokeWidth={1.8} />
  </svg>
);

export const EntryIcon: React.FC<IconProps> = ({ size = 19, color = '#A79E86' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x={4} y={4} width={16} height={16} rx={3} stroke={color} strokeWidth={2} />
    <path d="M4 10h16M9 4v16" stroke={color} strokeWidth={1.8} />
  </svg>
);

export const ReportIcon: React.FC<IconProps> = ({ size = 19, color = '#A79E86' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 20V10M11 20V4M18 20v-7" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 13, color = '#2B2405' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke={color} strokeWidth={2.6} strokeLinecap="round" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 14, color = '#CFE0D5' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={11} cy={11} r={7} stroke={color} strokeWidth={2} />
    <path d="M21 21l-4.3-4.3" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 7, color = '#C7BC9C' }) => (
  <svg width={size} height={size * 1.7} viewBox="0 0 7 12" fill="none">
    <path d="M1 1l5 5-5 5" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ size = 16, color = '#EFE8D6' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M15 5l-7 7 7 7" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 9, color = '#6b5410' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 9l6 6 6-6" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const RulesIcon: React.FC<IconProps> = ({ size = 19, color = '#2B2405' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20V4H6.5A2.5 2.5 0 004 6.5v13z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <path d="M9 8h6M9 12h4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </svg>
);

export const CameraIcon: React.FC<IconProps> = ({ size = 19, color = '#2B2405' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4 8.5h3l1.5-2.5h7L17 8.5h3a1 1 0 011 1V18a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5a1 1 0 011-1z"
      stroke={color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <circle cx={12} cy={13.5} r={3.2} stroke={color} strokeWidth={2} />
  </svg>
);
