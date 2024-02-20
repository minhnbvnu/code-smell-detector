function AnimateRunner(host) {
      this.setHost(host);

      var rafTick = $$animateAsyncRun();
      var timeoutTick = function(fn) {
        $timeout(fn, 0, false);
      };

      this._doneCallbacks = [];
      this._tick = function(fn) {
        var doc = $document[0];

        // the document may not be ready or attached
        // to the module for some internal tests
        if (doc && doc.hidden) {
          timeoutTick(fn);
        } else {
          rafTick(fn);
        }
      };
      this._state = 0;
    }