function runReactions() {
  // queue the flush
  if (!flushWaiting) {
    flushWaiting = true;
    Object(__WEBPACK_IMPORTED_MODULE_3__next_tick__["a" /* nextTick */])(flushReactions);
  }
}