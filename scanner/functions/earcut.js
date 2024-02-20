function earcut(data, holeIndices, dim, areas) {
    dim = dim || 2;
    const hasHoles = holeIndices && holeIndices.length;
    const outerLen = hasHoles ? holeIndices[0] * dim : data.length;
    let outerNode = linkedList(data, 0, outerLen, dim, true, areas && areas[0]);
    const triangles = [];
    if (!outerNode || outerNode.next === outerNode.prev)
      return triangles;
    let invSize;
    let maxX;
    let maxY;
    let minX;
    let minY;
    let x;
    let y;
    if (hasHoles)
      outerNode = eliminateHoles(data, holeIndices, outerNode, dim, areas);
    if (data.length > 80 * dim) {
      minX = maxX = data[0];
      minY = maxY = data[1];
      for (let i = dim; i < outerLen; i += dim) {
        x = data[i];
        y = data[i + 1];
        if (x < minX)
          minX = x;
        if (y < minY)
          minY = y;
        if (x > maxX)
          maxX = x;
        if (y > maxY)
          maxY = y;
      }
      invSize = Math.max(maxX - minX, maxY - minY);
      invSize = invSize !== 0 ? 1 / invSize : 0;
    }
    earcutLinked(outerNode, triangles, dim, minX, minY, invSize);
    return triangles;
  }