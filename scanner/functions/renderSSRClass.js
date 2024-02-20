function renderSSRClass (
  staticClass,
  dynamic
) {
  var res = renderClass$1(staticClass, dynamic);
  return res === '' ? res : (" class=\"" + (cachedEscape(res)) + "\"")
}