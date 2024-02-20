function afterEventLoop() {
  // Waiting 0 seconds essentially lets us run at the end of the event
  // loop (i.e. after any promises which aren't _actually_ async have finished)
  return new Promise(res => setTimeout(res, 0));
}