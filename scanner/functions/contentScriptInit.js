async function contentScriptInit(resetSwitch, msg) {
  // Second arg is for debugging to see which contentScriptInit fires
  // Call count tracks number of times contentScriptInit has been called
  // callCount = callCount + 1;

  if (resetSwitch) {
    contentScriptDelay = 999;
    contentScriptSetTimeout();
  }

  // Resource call is not in FBC/FB Domain and is a FB resource
  if (checkForTrackers && msg !== "other-domain") {
    await detectFacebookOnPage();
    screenUpdate();
  }
}