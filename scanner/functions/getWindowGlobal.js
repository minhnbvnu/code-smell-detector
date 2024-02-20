function getWindowGlobal(id, k) {
  var w = windowGlobals[id];
  if (!w) {
    console.error('windowGlobals not found', id);
    return;
  }
  return w[k];
}