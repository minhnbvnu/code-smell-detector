function grow(spanningTree) {
    const spanningGraph = spanningTree.getGraph()

    const processed = new Set()
    growAt(spanningTree.getRootId())

    function growAt(nodeId) {
      if (processed.has(nodeId)) return

      processed.add(nodeId)

      const rootPos = getRect(nodeId)

      spanningGraph.forEachLinkedNode(nodeId, otherNode => {
        if (processed.has(otherNode.id)) return

        const childPos = getRect(otherNode.id)
        removeOverlapsForRectangles(rootPos, childPos);
        growAt(otherNode.id)
      })
    }
  }