function setScrollLock(enabled) {
      // set the scrollbar to be position:fixed in preparation to overscroll
      // or remove it so the app can be natively scrolled
      if (enabled) {
        ionic.requestAnimationFrame(function() {
          scrollChild.classList.add('overscroll');
          show();
        });

      } else {
        ionic.requestAnimationFrame(function() {
          scrollChild.classList.remove('overscroll');
          hide();
          deactivate();
        });
      }
    }