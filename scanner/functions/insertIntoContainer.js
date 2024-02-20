function insertIntoContainer(node, container) {
  let children = document.createDocumentFragment()
  while (node.childNodes.length > 0) {
    children.appendChild(node.childNodes[0])
  }
  container.appendChild(children)
}