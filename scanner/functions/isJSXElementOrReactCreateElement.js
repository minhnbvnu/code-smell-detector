function isJSXElementOrReactCreateElement(path) {
  let visited = false

  path.traverse({
    CallExpression(path2) {
      const callee = path2.get('callee')

      if (
        callee.matchesPattern('React.createElement') ||
        callee.matchesPattern('React.cloneElement') ||
        callee.node.name === 'cloneElement'
      ) {
        visited = true
      }
    },
    JSXElement() {
      visited = true
    },
  })

  return visited
}