function validateResize() {
      var h = scrollView.__clientHeight, w = scrollView.__clientWidth;
      if (w && h && (validateResize.height !== h || validateResize.width !== w)) {
        validateResize.height = h;
        validateResize.width = w;
        refreshDimensions();
      }
    }