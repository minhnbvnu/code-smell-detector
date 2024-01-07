function areConnected(edgeA, edgeB) {
      return edgeA.target() === edgeB.source() ||
             edgeA.source() === edgeB.target() ||
             edgeA.target() === edgeB.target() ||
             edgeA.source() === edgeB.source();
    }