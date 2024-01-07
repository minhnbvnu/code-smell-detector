function listenOnce(target, type, listener, thisArg) {
  return listen(target, type, listener, thisArg, true);
}