function findChild (el, cssSelector) {
  const children = el.getChildren()
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (child.is(cssSelector)) return child
  }
}