function normalizeArguments2(opts) {
    const {
      logLevel,
      message
    } = opts;
    opts.logLevel = normalizeLogLevel2(logLevel);
    const args = opts.args ? Array.from(opts.args) : [];
    while (args.length && args.shift() !== message) {
    }
    switch (typeof logLevel) {
      case "string":
      case "function":
        if (message !== void 0) {
          args.unshift(message);
        }
        opts.message = logLevel;
        break;
      case "object":
        Object.assign(opts, logLevel);
        break;
      default:
    }
    if (typeof opts.message === "function") {
      opts.message = opts.message();
    }
    const messageType = typeof opts.message;
    assert6(messageType === "string" || messageType === "object");
    return Object.assign(opts, {
      args
    }, opts.opts);
  }