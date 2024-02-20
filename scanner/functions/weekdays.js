function weekdays (weekStart) {
  if (--weekStart < 0) {
    weekStart = 6
  }

  let weekDays = Info.weekdays('short').map(weekday => capitalize(weekday))

  weekDays = weekDays.concat(weekDays.splice(0, weekStart))

  return weekDays
}