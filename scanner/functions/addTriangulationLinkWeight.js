function addTriangulationLinkWeight(link) {
    const from = getRect(link.fromId)
    const to = getRect(link.toId)
    const weight = getTriangulationWeight(from, to)
    link.data = weight;
  }