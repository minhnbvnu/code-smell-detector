function wrapInCurlies(node) {
  return {
    type: 'BlockStatement',
    body: [node]
  }
}