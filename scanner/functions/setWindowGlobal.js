function setWindowGlobal(id, k, v) {
  var w = windowGlobals[id];
  if (!w) {
    console.error('windowGlobals not found', id);
    return;
  }

  w[k] = v;
}