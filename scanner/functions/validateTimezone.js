function validateTimezone(hours, minutes) {
  return -23 <= hours && hours <= 23 && (minutes == null || (0 <= minutes && minutes <= 59))
}