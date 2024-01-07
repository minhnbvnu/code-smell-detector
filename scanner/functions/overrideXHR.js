function overrideXHR(xhr) {
  if (typeof XMLHttpRequest !== 'undefined') {
    originalXHR = XMLHttpRequest;
  }
  global.XMLHttpRequest = xhr;
}