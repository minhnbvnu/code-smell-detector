async function hardReset() {
  log("clear-cache", "clearBridgeCache()");
  clearBridgeCache();
  log("clear-cache", "hardReset()");
  disableDBMiddleware();
  resetAll();
  window.localStorage.clear();
}