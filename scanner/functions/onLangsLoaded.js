function onLangsLoaded() {
    if (autorun) {
      contentLoaded(
        function () {
          var n = callbacks.length;
          var callback = n ? function () {
            for (var i = 0; i < n; ++i) {
              (function (i) {
                win.setTimeout(
                  function () {
                    win['exports'][callbacks[i]].apply(win, arguments);
                  }, 0);
              })(i);
            }
          } : void 0;
          prettyPrint(callback);
        });
    }
  }