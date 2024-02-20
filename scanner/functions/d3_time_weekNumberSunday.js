function d3_time_weekNumberSunday(d) {
  var d0 = d3_time_year(d);
  return d3_time_zfill2(~~((d3_time_daysElapsed(d0, d) + d0.getDay()) / 7));
}