function clearCache() {
  if (!clearRunning) {
    clearRunning = true;
    var millisecondsPerWeek = constants["D" /* MILLISECONDS_PER_WEEK */];
    var oneWeekAgo = new Date().getTime() - millisecondsPerWeek;
    chrome.browsingData.removeCache({
      since: oneWeekAgo
    }, function () {
      clearRunning = false;
    });
  }
}