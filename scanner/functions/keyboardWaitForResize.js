function keyboardWaitForResize(callback, isOpening) {
  clearInterval(waitForResizeTimer);
  var count = 0;
  var maxCount;
  var initialHeight = getViewportHeight();
  var viewportHeight = initialHeight;

  //console.log("waitForResize initial viewport height: " + viewportHeight);
  //var start = Date.now();
  //console.log("start: " + start);

  // want to fail relatively quickly on modern android devices, since it's much
  // more likely we just have a bad keyboard height
  if (ionic.Platform.isAndroid() && ionic.Platform.version() < 4.4) {
    maxCount = 30;
  } else if (ionic.Platform.isAndroid()) {
    maxCount = 10;
  } else {
    maxCount = 1;
  }

  // poll timer
  waitForResizeTimer = setInterval(function(){
    viewportHeight = getViewportHeight();

    // height hasn't updated yet, try again in 50ms
    // if not using plugin, wait for maxCount to ensure we have waited long enough
    // to get an accurate keyboard height
    if (++count < maxCount &&
        ((!isPortraitViewportHeight(viewportHeight) &&
         !isLandscapeViewportHeight(viewportHeight)) ||
         !ionic.keyboard.height)) {
      return;
    }

    // infer the keyboard height from the resize if not using the keyboard plugin
    if (!keyboardHasPlugin()) {
      ionic.keyboard.height = Math.abs(initialHeight - window.innerHeight);
    }

    // set to true if we were waiting for the keyboard to open
    ionic.keyboard.isOpen = isOpening;

    clearInterval(waitForResizeTimer);
    //var end = Date.now();
    //console.log("waitForResize count: " + count);
    //console.log("end: " + end);
    //console.log("difference: " + ( end - start ) + "ms");

    //console.log("callback: " + callback.name);
    callback();

  }, 50);

  return maxCount; //for tests
}