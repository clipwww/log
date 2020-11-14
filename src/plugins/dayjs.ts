import dayjs from 'dayjs';
import zhTW from 'dayjs/locale/zh-tw'
import isLeapYear from 'dayjs/plugin/isLeapYear';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import dayOfYear from 'dayjs/plugin/dayOfYear';

dayjs.locale(zhTW);
dayjs.extend(isLeapYear);
dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(dayOfYear);

function formatDate(date: string | Date, hasTime = true) {
  return dayjs(date).format(hasTime ? 'YYYY/MM/DD HH:mm' : 'YYYY/MM/DD')
}

export {
  dayjs,
  formatDate
};