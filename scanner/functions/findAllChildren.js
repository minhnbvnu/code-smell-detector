function findAllChildren (el, cssSelector) {
  const children = el.getChildren()
  let result = []
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (child.is(cssSelector)) {
      result.push(child)
    }
  }
  return result
}