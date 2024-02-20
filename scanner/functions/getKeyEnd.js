function getKeyEnd(prop) {
  var end = prop.key.endToken;
  end = _tk.findNext(end, [':', '(', ',', '}']);
  return _tk.findPrev(end, _tk.isCode);
}