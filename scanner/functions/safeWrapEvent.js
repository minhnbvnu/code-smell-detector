function safeWrapEvent(w, e) {
  var addListener = e.addListener;

  e.addListener = function(f) {
    autoUnregister(w, e, f);
    addListener(f);
  }
}