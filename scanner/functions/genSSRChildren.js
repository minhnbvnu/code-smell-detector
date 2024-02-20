function genSSRChildren (el, state, checkSkip) {
  return genChildren(el, state, checkSkip, genSSRElement, genSSRNode)
}