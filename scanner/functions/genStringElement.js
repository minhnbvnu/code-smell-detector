function genStringElement (el, state) {
  return ("_ssrNode(" + (elementToString(el, state)) + ")")
}