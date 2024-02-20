function onHide() {
      if (ionic.Platform.isAndroid() && !ionic.Platform.isFullScreen) {
        return;
      }

      element.css('bottom', '');
      if (scrollCtrl) {
        scrollCtrl.scrollView.__container.style.bottom = '';
      }
    }