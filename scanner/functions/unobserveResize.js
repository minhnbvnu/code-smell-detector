function unobserveResize(element, callback) {
  const callbacks = getCallbacks(element);
  callbacks.delete(callback);

  if (!callbacks.size) {
    observer.unobserve(element);
  }
}