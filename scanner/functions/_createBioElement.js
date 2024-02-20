function _createBioElement ($$, exporter, node) {
  let content = node.resolve('bio')
  if (content.length > 0) {
    // NOTE: we don't want to export empty containers
    // e.g. if there is only one empty paragraph we are not exporting anything
    let first = content[0]
    if (content.length === 1 && first.isText() && first.isEmpty()) {
      return
    }
    let bioEl = $$('bio').append(
      content.map(p => exporter.convertNode(p))
    )
    return bioEl
  }
}