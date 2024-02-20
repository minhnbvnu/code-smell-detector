function trycatch(fn, handle) {
  try {
    return fn();
  } catch (e) {
    return handle(e);
  }
}