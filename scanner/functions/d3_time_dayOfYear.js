function d3_time_dayOfYear(d) {
  return d3_time_zfill3(1 + d3_time_daysElapsed(d3_time_year(d), d));
}