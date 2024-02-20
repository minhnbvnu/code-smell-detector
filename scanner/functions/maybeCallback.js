function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}