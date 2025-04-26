const AZERBAIJANI_MONTHS: { [key: number]: string } = {
  0: 'yanvar',
  1: 'fevral',
  2: 'mart',
  3: 'aprel',
  4: 'may',
  5: 'iyun',
  6: 'iyul',
  7: 'avqust',
  8: 'sentyabr',
  9: 'oktyabr',
  10: 'noyabr',
  11: 'dekabr'
};

const AZERBAIJANI_WEEKDAYS: { [key: number]: string } = {
  0: 'bazar',
  1: 'bazar ertəsi',
  2: 'çərşənbə axşamı',
  3: 'çərşənbə',
  4: 'cümə axşamı',
  5: 'cümə',
  6: 'şənbə'
};

export const formatDateForAzerbaijani = (date: Date): string => {
  const day = date.getDate();
  const month = AZERBAIJANI_MONTHS[date.getMonth()];
  const weekday = AZERBAIJANI_WEEKDAYS[date.getDay()];
  return `${day} ${month}, ${weekday}`;
}; 