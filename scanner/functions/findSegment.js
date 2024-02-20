function findSegment(root, segmentName) {
  for (let i = 0; i < root.children.length; i++) {
    const segment = root.children[i]
    if (segment.name === segmentName) {
      return segment
    }
  }
}