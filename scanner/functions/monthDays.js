function monthDays (year, month, weekStart) {
  const monthDate = DateTime.local(year, month, 1)
  let firstDay = monthDate.weekday - weekStart

  if (firstDay < 0) {
    firstDay += 7
  }
  let lastDay = (weekStart - monthDate.weekday - monthDate.daysInMonth) % 7
  if (lastDay < 0) {
    lastDay += 7
  }

  return Array.apply(null, Array(monthDate.daysInMonth + firstDay + lastDay))
    .map((value, index) =>
      (index + 1 <= firstDay || index >= firstDay + monthDate.daysInMonth) ? null : (index + 1 - firstDay)
    )
}