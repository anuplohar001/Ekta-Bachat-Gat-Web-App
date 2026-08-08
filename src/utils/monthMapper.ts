export const MARATHI_MONTHS = [
  'जानेवारी',
  'फेब्रुवारी',
  'मार्च',
  'एप्रिल',
  'मे',
  'जून',
  'जुलै',
  'ऑगस्ट',
  'सप्टेंबर',
  'ऑक्टोबर',
  'नोव्हेंबर',
  'डिसेंबर',
] as const;

export const ENGLISH_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const MR_TO_EN: Record<string, string> = MARATHI_MONTHS.reduce((map, mr, index) => {
  map[mr] = ENGLISH_MONTHS[index];
  return map;
}, {} as Record<string, string>);

const EN_TO_MR: Record<string, string> = ENGLISH_MONTHS.reduce((map, en, index) => {
  map[en] = MARATHI_MONTHS[index];
  return map;
}, {} as Record<string, string>);

export const toEnglishMonth = (marathiMonth: string): string =>
  MR_TO_EN[marathiMonth] ?? marathiMonth;

export const toMarathiMonth = (englishMonth: string): string =>
  EN_TO_MR[englishMonth] ?? englishMonth;

export const getCurrentMarathiMonth = (): string =>
  MARATHI_MONTHS[new Date().getMonth()];

export const formatJoinedDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString('mr-IN', { month: 'long', year: 'numeric' });
};
