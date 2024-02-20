function isReactClass(superClass, scope, globalOptions) {
  if (!superClass.node) {
    return false
  }

  let answer = false

  if (isPathReactClass(superClass, globalOptions)) {
    answer = true
  } else if (superClass.node.name) {
    // Check for inheritance
    const className = superClass.node.name
    const binding = scope.getBinding(className)
    if (!binding) {
      answer = false
    } else {
      const bindingSuperClass = binding.path.get('superClass')

      if (isPathReactClass(bindingSuperClass, globalOptions)) {
        answer = true
      }
    }
  }

  return answer
}