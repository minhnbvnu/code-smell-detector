function observeResize(element, callback) {
  getCallbacks(element).add(callback);
  observer.observe(element);
}