function addCurly(node) {
  if (node.body.type == 'BlockStatement') {
    return node
  }

  return merge(node, {
    body: wrapInCurlies(node.body)
  })
}