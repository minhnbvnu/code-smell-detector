function renderDOMProps$1 (obj) {
  var res = '';
  for (var key in obj) {
    var attr = propsToAttrMap[key] || key.toLowerCase();
    if (isRenderableAttr(attr)) {
      res += renderAttr(attr, obj[key]);
    }
  }
  return res
}