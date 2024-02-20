function startUpdateChecker() {
  clearInterval(updateCheckerId);
  updateChecker();
  // do this once a day
  updateCheckerId = setInterval(updateChecker, 24 * 60 * 60 * 1000);
}