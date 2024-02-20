function onIntersectionChange(entries) {
        // There may be multiple entries relating to the same container
        // (captured at different times)
        var isIntersecting = entries.reduce(function(memo, entry) {
          return memo || entry.isIntersecting;
        }, false);
        if (isIntersecting) {
          waiting = false;
          // update: don't remove -- we need the observer to trigger an update
          // when a hidden map becomes visible after user interaction
          // (e.g. when an accordion menu or tab opens)
          // observer.disconnect();
          // observer = null;
          update();
        }
      }