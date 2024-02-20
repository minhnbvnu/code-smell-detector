function onShow(e) {
      if (ionic.Platform.isAndroid() && !ionic.Platform.isFullScreen) {
        return;
      }

      //for testing
      var keyboardHeight = e.keyboardHeight || (e.detail && e.detail.keyboardHeight);
      element.css('bottom', keyboardHeight + "px");
      scrollCtrl = element.controller('$ionicScroll');
      if (scrollCtrl) {
        scrollCtrl.scrollView.__container.style.bottom = keyboardHeight + keyboardAttachGetClientHeight(element[0]) + "px";
      }
    }