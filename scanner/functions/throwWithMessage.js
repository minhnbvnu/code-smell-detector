function throwWithMessage(msg) {
  return function() {
    throw new Error(msg);
  };
}