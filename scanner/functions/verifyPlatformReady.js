function verifyPlatformReady() {
    setTimeout(function() {
      if(!self.isReady && self.isWebView()) {
        void 0;
      }
    }, platformReadyTimer);
  }