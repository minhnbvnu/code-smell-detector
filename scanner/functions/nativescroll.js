function nativescroll(target, newScrollTop) {
      // creates a scroll event that bubbles, can be cancelled, and with its view
      // and detail property initialized to window and 1, respectively
      target.scrollTop = newScrollTop;
      var e = document.createEvent("UIEvents");
      e.initUIEvent("scroll", true, true, window, 1);
      target.dispatchEvent(e);
    }