function contentScriptSetTimeout() {
  // console.timeEnd('contentScriptSetTimeout');
  // console.timeStart('contentScriptSetTimeout');
  contentScriptDelay = Math.ceil(contentScriptDelay * 2);
  contentScriptInit(false);
  if (contentScriptDelay > 999999) {
    return false;
  }
  setTimeout(contentScriptSetTimeout, contentScriptDelay);
}