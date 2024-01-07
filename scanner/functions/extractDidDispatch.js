function extractDidDispatch(listener) {
  return typeof listener === 'function' ? listener : listener.didDispatch;
}