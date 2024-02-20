function d3_time_minutesStep(date) {
  date.setTime(date.getTime() + 6e4); // assumes no leap seconds
}