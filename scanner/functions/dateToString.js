function dateToString (date, utc = true) {
  if (date == null || date === 'none') {
    return 'n/a'
  }
  if (utc && !date.endsWith('Z')) {
    date += 'Z'
  }
  return String(new Date(date)).slice(0, 24)
}