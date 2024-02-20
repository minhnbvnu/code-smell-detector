function dirString$1(source, times) {
      var _console = console,
        dir = _console.dir;
      function dirWrapper(object) {
        if (typeof dir === 'function') {
          dir.call(this, object);
        }
        hit(source);
      }
      // eslint-disable-next-line no-console
      console.dir = dirWrapper;
    }