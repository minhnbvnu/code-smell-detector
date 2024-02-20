function getNativeLogFunction(level) {
    return function() {
      var str;
      if (arguments.length === 1 && typeof arguments[0] === 'string') {
        str = arguments[0];
      } else {
        str = Array.prototype.map.call(arguments, function(arg) {
          return inspect(arg, {depth: 10});
        }).join(', ');
      }

      var logLevel = level;
      if (str.slice(0, 9) === 'Warning: ' && logLevel >= LOG_LEVELS.error) {
        // React warnings use console.error so that a stack trace is shown,
        // but we don't (currently) want these to show a redbox
        // (Note: Logic duplicated in ExceptionsManager.js.)
        logLevel = LOG_LEVELS.warn;
      }
      global.nativeLoggingHook(str, logLevel);
    };
  }