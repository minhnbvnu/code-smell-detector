function emit$1(event, ...args) {
    if (exports.devtools) {
      exports.devtools.emit(event, ...args);
    } else if (!devtoolsNotInstalled) {
      buffer.push({ event, args });
    }
  }