function weekStart () {
  let weekstart

  try {
    weekstart = require('weekstart/package.json').version ? require('weekstart') : null
  } catch (e) {
    weekstart = window.weekstart
  }

  const firstDay = weekstart ? weekstart.getWeekStartByLocale(Settings.defaultLocale) : 1

  return firstDay === 0 ? 7 : firstDay
}