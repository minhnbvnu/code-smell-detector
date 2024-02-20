function safeCallback(w, f) {
  var safe = true;
  w.on('close', function() {
    safe = false;
  })

  return function() {
    if (safe)
      f.apply.apply(f, arguments);
  };
}