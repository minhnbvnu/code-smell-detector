function getComputedOpacity(obj) {
  var opacity = 1;
  while (obj && obj.typename != "Document") {
    opacity *= obj.opacity / 100;
    obj = obj.parent;
  }
  return opacity * 100;
}