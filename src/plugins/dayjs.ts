import dayjs from 'dayjs'
import zhTW from 'dayjs/locale/zh-tw'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import duration from 'dayjs/plugin/duration'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekday from 'dayjs/plugin/weekday'

dayjs.locale(zhTW)
dayjs.extend(isLeapYear)
dayjs.extend(weekday)
dayjs.extend(isoWeek)
dayjs.extend(dayOfYear)
dayjs.extend(duration)

function formatDate(date: string | Date, hasTime = true) {
  return dayjs(date).format(hasTime ? 'YYYY/MM/DD HH:mm' : 'YYYY/MM/DD')
}

export {
  dayjs,
  formatDate,
}
