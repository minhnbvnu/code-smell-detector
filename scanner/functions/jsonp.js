function jsonp(url, callback, errback, callbackParam) {
  const script = document.createElement('script');
  const key = 'olc_' + getUid(callback);
  function cleanup() {
    delete window[key];
    script.parentNode.removeChild(script);
  }
  script.async = true;
  script.src =
    url +
    (url.includes('?') ? '&' : '?') +
    (callbackParam || 'callback') +
    '=' +
    key;
  const timer = setTimeout(function () {
    cleanup();
    if (errback) {
      errback();
    }
  }, 10000);
  window[key] = function (data) {
    clearTimeout(timer);
    cleanup();
    callback(data);
  };
  document.head.appendChild(script);
}