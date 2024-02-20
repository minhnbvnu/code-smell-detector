function childrenToSegments (el, state) {
  var binding;
  if ((binding = el.attrsMap['v-html'])) {
    return [{ type: EXPRESSION, value: binding }]
  }
  if ((binding = el.attrsMap['v-text'])) {
    return [{ type: INTERPOLATION, value: binding }]
  }
  return el.children
    ? nodesToSegments(el.children, state)
    : []
}