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

  // Premium palette for stat cards
  statSavingsBg: '#EAF3EE',
  statSavingsText: '#379b67',
  statLoanBg: '#EDF0FA',
  statLoanText: '#20a3f0ce',
  statRepayBg: '#E8F4F3',
  statRepayText: '#368078',
  statBalanceBg: '#EEEAFB',
  statBalanceText: '#554580',
  statFeeBg: '#FBF3E6',
  statFeeText: '#9c660f',
  statPenaltyBg: '#FBECEA',
  statPenaltyText: '#862819e0',
  statInterestBg: '#F3EDF7',
  statInterestText: '#9a62df',
  statGstBg: '#F8EEE9',
  statGstText: '#b14c21',
  statPendingBg: '#F7E7E5',
  statPendingText: '#b34545',

  // Light gradient backgrounds (from white/lighter tint to base tint)
  goldPaleGrad: 'linear-gradient(135deg, #FDFAF0, #F4EAC8)',
  photoGrad: 'linear-gradient(135deg, #FFF7EC, #FFE5C6)',
  successBgGrad: 'linear-gradient(135deg, #F5FBF7, #E4F1E8)',
  creamGrad: 'linear-gradient(135deg, #FFFFFF, #F6F1E6)',
  redTintGrad: 'linear-gradient(135deg, #FFF5F5, #FDEAEA)',
  blueTintGrad: 'linear-gradient(135deg, #F8FBFF, #F0F5FF)',
  loanRequestGrad: 'linear-gradient(135deg, #EAF2FF, #D9E8FF)',

  statSavingsGrad: 'linear-gradient(135deg, #FFFFFF, #EAF3EE)',
  statLoanGrad: 'linear-gradient(135deg, #FFFFFF, #EDF0FA)',
  statRepayGrad: 'linear-gradient(135deg, #FFFFFF, #E8F4F3)',
  statBalanceGrad: 'linear-gradient(135deg, #FFFFFF, #EEEAFB)',
  statFeeGrad: 'linear-gradient(135deg, #FFFFFF, #FBF3E6)',
  statPenaltyGrad: 'linear-gradient(135deg, #FFFFFF, #FBECEA)',
  statPendingGrad: 'linear-gradient(135deg, #FFFFFF, #F7E7E5)',
  statInterestGrad: 'linear-gradient(135deg, #FFFFFF, #F3EDF7)',
  statGstGrad: 'linear-gradient(135deg, #FFFFFF, #F8EEE9)',

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
