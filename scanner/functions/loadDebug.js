function loadDebug() {
  var s = localStorage["debug_?"];
  return s ? s === 'true' : false;
}