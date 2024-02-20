function validateTime(hours, minutes, seconds) {
  if (hours != null && (hours < 0 || hours >= 25)) {
    return false
  }

  if (minutes != null && (minutes < 0 || minutes >= 60)) {
    return false
  }

  if (seconds != null && (seconds < 0 || seconds >= 60)) {
    return false
  }

  return true
}