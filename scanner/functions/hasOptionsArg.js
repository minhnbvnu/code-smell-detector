function hasOptionsArg(doc) {
  return !!doc.content.params.find((param) => param.name === 'options')
}