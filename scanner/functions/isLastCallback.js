function isLastCallback(node) {
  /** @type {Node} */
  let target = node.parent
  /** @type {Node | undefined} */
  let parent = target.parent
  while (parent) {
    if (parent.type === 'ExpressionStatement') {
      // e.g. { promise.then(() => value) }
      return true
    }
    if (parent.type === 'UnaryExpression') {
      // e.g. void promise.then(() => value)
      return parent.operator === 'void'
    }
    /** @type {Node | null} */
    let nextTarget = null
    if (parent.type === 'SequenceExpression') {
      if (peek(parent.expressions) !== target) {
        // e.g. (promise?.then(() => value), expr)
        return true
      }
      nextTarget = parent
    } else if (
      // e.g. promise?.then(() => value)
      parent.type === 'ChainExpression' ||
      // e.g. await promise.then(() => value)
      parent.type === 'AwaitExpression'
    ) {
      nextTarget = parent
    } else if (parent.type === 'MemberExpression') {
      if (
        parent.parent &&
        (isMemberCall('catch', parent.parent) ||
          isMemberCall('finally', parent.parent))
      ) {
        // e.g. promise.then(() => value).catch(e => {})
        nextTarget = parent.parent
      }
    }
    if (nextTarget) {
      target = nextTarget
      parent = target.parent
      continue
    }
    return false
  }

  // istanbul ignore next
  return false
}