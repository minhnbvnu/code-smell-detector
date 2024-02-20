function renderAttrs$1 (obj) {
  var res = '';
  for (var key in obj) {
    res += renderAttr(key, obj[key]);
  }
  return res
}