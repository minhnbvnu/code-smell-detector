function renderInDocument (vnode) {
  const node = document.createElement(`div`)
  document.body.appendChild(node)

  const cleanup = () => document.body.removeChild(node)

  render(vnode, node)

  return {node: node.firstChild, cleanup}
}