function buffer(fn, ms) {
  var timer = void 0;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function bufferFn() {
    clear();
    timer = setTimeout(fn, ms);
  }
  bufferFn.clear = clear;
  return bufferFn;
}