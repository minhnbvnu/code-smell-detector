function compareSegments(parent, segments) {
  this.ok(parent.children.length, segments.length, 'should be the same amount of children')
  segments.forEach((segment, index) => {
    this.equal(parent.children[index].id, segment.id, 'should have same ids')
  })
}