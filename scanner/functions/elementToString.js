function elementToString (el, state) {
  return ("(" + (flattenSegments(elementToSegments(el, state))) + ")")
}