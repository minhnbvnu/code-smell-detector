function getKeyStart(prop) {
  var start = prop.key.startToken;
  start = _tk.findPrev(start, ['{', ',']);
  return _tk.findNext(start, _tk.isCode);
}