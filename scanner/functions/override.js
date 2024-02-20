function override() {
    // Override video element canPlayType() function
    var videoElem = document.createElement('video');
    var origCanPlayType = videoElem.canPlayType.bind(videoElem);
    videoElem.__proto__.canPlayType = makeModifiedTypeChecker(origCanPlayType);

    // Override media source extension isTypeSupported() function
    var mse = window.MediaSource;
    // Check for MSE support before use
    if (mse === undefined) return;
    var origIsTypeSupported = mse.isTypeSupported.bind(mse);
    mse.isTypeSupported = makeModifiedTypeChecker(origIsTypeSupported);
  }