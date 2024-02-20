function waitForImageToLoad(timeout) {
    return function waitForImageToLoad(img) {
      var poller = pollUntil(function(img) {
        // http://stackoverflow.com/a/12687466/319878
        // https://www.w3.org/TR/html5/embedded-content-0.html#dom-img-complete

        // REMEMBER! Return null when you need to keep waiting.

        // Returns the width and height as an object that is serialised by
        // WebDriver back to our test.
        return (img.complete && img.width > 0 && img.height > 0) ? { width: img.width, height: img.height } : null;
      }, [img], timeout);
      return poller.apply(this, arguments);
    };
  }