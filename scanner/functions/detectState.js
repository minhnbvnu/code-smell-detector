function detectState(autoHidingNavbar) {
    var scrollTop = $window.scrollTop(),
        scrollDelta = scrollTop - _previousScrollTop;

    _previousScrollTop = scrollTop;

    if (scrollDelta < 0) {
      if (_visible) {
        return;
      }

      if (autoHidingNavbar.settings.showOnUpscroll || scrollTop <= _hideOffset) {
        show(autoHidingNavbar);
      }
    }
    else if (scrollDelta > 0) {
      if (!_visible) {
        if (autoHidingNavbar.settings.showOnBottom && scrollTop + _windowHeight === $document.height()) {
          show(autoHidingNavbar);
        }
        return;
      }

      if (scrollTop >= _hideOffset) {
        hide(autoHidingNavbar);
      }
    }

  }