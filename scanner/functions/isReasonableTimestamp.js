function isReasonableTimestamp(time) {
  return new Date(time).getFullYear() === new Date().getFullYear();
}