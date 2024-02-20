function d3_time_parseHour12(date, string, i) {
  date.hour12 = true;
  return d3_time_parseHour24(date, string, i);
}