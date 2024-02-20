function info() {
      var args = Array.prototype.slice.call(arguments, 0);
      args.unshift('INFO');
      log.apply(undefined, args);
    }