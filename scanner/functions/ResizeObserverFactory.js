function ResizeObserverFactory(ias, el) {
  let listener = throttle(resizeHandler, 200).bind(ias);

  if (el === window) {
    return new EventListenerResizeObserver(el, listener);
  }

  if (NativeResizeObserver) {
    return new NativeWrapperResizeObserver(el, listener);
  }

  if (console && console.warn) {
    console.warn('ResizeObserver not supported. Falling back on polling.');
  }

  return new PollingResizeObserver(el, listener);
}