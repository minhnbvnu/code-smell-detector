function dirString(source, times) {
        var _console = console,
          dir = _console.dir;
        function dirWrapper(object) {
          if (typeof dir === "function") {
            dir.call(this, object);
          }
          hit(source);
        }
        console.dir = dirWrapper;
      }