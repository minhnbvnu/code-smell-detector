function getWeekNumber(d) {
  // Copy date so don't modify original
  const _d = new Date(Date.UTC(d.year, d.month, d.date));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  _d.setUTCDate(_d.getUTCDate() + 4 - (_d.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(_d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  return Math.ceil(((_d - yearStart) / 86400000 + 1) / 7);
}