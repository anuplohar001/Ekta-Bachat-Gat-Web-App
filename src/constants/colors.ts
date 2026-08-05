// Colors copied 1:1 from the HTML mockup's CSS variables (:root { ... })
export const colors = {
  ink: '#12241C',
  forest: '#1B4332',
  forestDeep: '#0E2318',
  gold: '#C9A227',
  goldSoft: '#E8D28A',
  goldPale: '#F4EAC8',
  cream: '#F6F1E6',
  cream2: '#EFE8D6',
  paperLine: '#E1D8BF',
  redInk: '#AF3B2A',
  secondary: '#b68f3b',
  blueInk: '#37609e',
  text: '#1E1E1A',
  textMuted: '#71695A',
  white: '#FFFFFF',

  // a few extra shades used directly in the mockup's inline styles
  goldPaleText: '#6b5410',
  goldDarkText: '#8a6a10',
  successBg: '#E4F1E8',
  successText: '#2F6B45',
  successGreen: '#4E8C67',
  cardBorder: '#ECE4D0',
  rowDivider: '#F1EBDA',
  inputBorder: '#DED4B4',
  inputPlaceholder: '#B7AD8C',
  chipInactiveBorder: '#E6DEC7',
  tabInactive: '#A79E86',
  avatarGradFrom: '#E9E0C8',
  avatarGradTo: '#DCCE9F',
  barInactive: '#D8CDA3',
  headerSubtleText: '#AEC2B3',
  headerFaintText: '#CFE0D5',



  // New tokens
  blueTint: '#F0F5FF',   // background of the totals bar
  border: '#DCE3EF',     // divider line between the two totals
  chipBg: '#F5F6F8',     // background of बचत/परतफेड/सेवाशुल्क chips
  redTint: '#FDEAEA',    // background of the दंड (penalty) chip
  cardBg: '#FFFFFF', 

} as const;

export type ColorKey = keyof typeof colors;

// gradient stops used for the top green header block
export const headerGradient: [string, string] = [colors.forest, colors.forestDeep];
// gradient used behind the yearly-summary "total turnover" hero card
export const heroGradient: [string, string] = [colors.forest, colors.forestDeep];
// gradient for member avatar circles
export const avatarGradient: [string, string] = [colors.avatarGradFrom, colors.avatarGradTo];
// gradient for gold seal
export const sealGradient: [string, string] = [colors.goldSoft, colors.gold];

export default colors;
