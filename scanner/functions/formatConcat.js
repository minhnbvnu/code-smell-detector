function formatConcat (startValue, endValue) {
  const s = new Date(startValue)
  const e = new Date(endValue)

  // 时间格式转换
  // start time
  const monthStringS = (s.getMonth() + 1 < 10) ? `0${s.getMonth() + 1}` : `${s.getMonth()}`
  const dateStringS = s.getDate() < 10 ? `0${s.getDate()}` : `${s.getDate()}`
  const hourStringS = s.getHours() < 10 ? `0${s.getHours()}` : `${s.getHours()}`
  const minuteStringS = s.getMinutes() < 10 ? `0${s.getMinutes()}` : `${s.getMinutes()}`

  // end time
  const monthStringE = (e.getMonth() + 1 < 10) ? `0${e.getMonth() + 1}` : `${e.getMonth()}`
  const dateStringE = e.getDate() < 10 ? `0${e.getDate()}` : `${e.getDate()}`
  const hourStringE = e.getHours() < 10 ? `0${e.getHours()}` : `${e.getHours()}`
  const minuteStringE = e.getMinutes() < 10 ? `0${e.getMinutes()}` : `${e.getMinutes()}`

  // 时间格式拼接
  const startDate = `${s.getFullYear()}-${monthStringS}-${dateStringS} ${hourStringS}:${minuteStringS}`
  const endDate = `${e.getFullYear()}-${monthStringE}-${dateStringE} ${hourStringE}:${minuteStringE}`

  return {startDate, endDate}
}