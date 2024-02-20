function getDatastoreSegment(segment) {
  return segment.parent.children.filter(function (s) {
    return /^Datastore/.test(s && s.name)
  })[0]
}