function LoggerFactory(options) {
      options = options || {
        prefix: true
      };

      // If `console.log` is not accessible, `log` is a noop.
      if (
        typeof console !== 'object' ||
        typeof console.log !== 'function' ||
        typeof console.log.bind !== 'function'
      ) {
        return function noop() {};
      }

      return function log() {
        var args = Array.prototype.slice.call(arguments);

        // All logs are disabled when `io.sails.environment = 'production'`.
        if (io.sails.environment === 'production') return;

        // Add prefix to log messages (unless disabled)
        var PREFIX = '';
        if (options.prefix) {
          args.unshift(PREFIX);
        }

        // Call wrapped logger
        console.log
          .bind(console)
          .apply(this, args);
      };
    }