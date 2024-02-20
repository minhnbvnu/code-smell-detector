function hasTerminalParent(tagName, stack, terminals) {
  const tagParents = terminals[tagName]
  if (tagParents) {
    let currentIndex = stack.length - 1
    while (currentIndex >= 0) {
      const parentTagName = stack[currentIndex].tagName
      if (parentTagName === tagName) {
        break
      }
      if (arrayIncludes(tagParents, parentTagName)) {
        return true
      }
      currentIndex--
    }
  }
  return false
}