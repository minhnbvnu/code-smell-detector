function genSSRNode (el, state) {
  return el.type === 1
    ? genSSRElement(el, state)
    : genText(el)
}