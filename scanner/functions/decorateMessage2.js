function decorateMessage2(id, message, opts) {
    if (typeof message === "string") {
      const time = opts.time ? leftPad2(formatTime2(opts.total)) : "";
      message = opts.time ? "".concat(id, ": ").concat(time, "  ").concat(message) : "".concat(id, ": ").concat(message);
      message = addColor2(message, opts.color, opts.background);
    }
    return message;
  }