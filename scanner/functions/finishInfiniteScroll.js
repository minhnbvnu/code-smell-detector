function finishInfiniteScroll() {
    ionic.requestAnimationFrame(function() {
      $element[0].classList.remove('active');
    });
    $timeout(function() {
      if (self.jsScrolling) self.scrollView.resize();
      // only check bounds again immediately if the page isn't cached (scroll el has height)
      if ((self.jsScrolling && self.scrollView.__container && self.scrollView.__container.offsetHeight > 0) ||
      !self.jsScrolling) {
        self.checkBounds();
      }
    }, 30, false);
    self.isLoading = false;
  }