function d3_time_daysElapsed(d0, d1) {
  return ~~((d1 - d0) / 864e5 - (d1.getTimezoneOffset() - d0.getTimezoneOffset()) / 1440);
}