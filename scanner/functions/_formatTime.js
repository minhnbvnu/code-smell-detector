function _formatTime(hour, minute) {
  return hour + ':' + (minute < 10 ? '0' + minute : minute);
}