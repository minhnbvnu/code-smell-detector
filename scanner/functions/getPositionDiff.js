function getPositionDiff(graph, sizeDiff) {
  const newGraph = {};
  const positionDiff = {};

  for (const key of Object.keys(graph)) {
    newGraph[key] = {
      above: [],
      left: []
    };
    positionDiff[key] = {
      x: 0,
      y: 0
    };
  } // Construct an inverted graph


  for (const [key, neighbors] of Object.entries(graph)) {
    const {
      below,
      right
    } = neighbors;

    if (right != null) {
      newGraph[right].left.push(key);
    }

    if (below != null) {
      newGraph[below].above.push(key);
    }
  }

  function walkRight(key) {
    const node = newGraph[key];
    const nodeSizeDiff = sizeDiff[key];
    node.left.forEach(left => {
      positionDiff[left].x += nodeSizeDiff.width + positionDiff[key].x;
      walkRight(left);
    });
  }

  function walkDown(key) {
    const node = newGraph[key];
    const nodeSizeDiff = sizeDiff[key];
    node.above.forEach(above => {
      positionDiff[above].y += nodeSizeDiff.height + positionDiff[key].y;
      walkDown(above);
    });
  } // Find disconnected nodes, and walk


  for (const [key, neighbors] of Object.entries(graph)) {
    if (neighbors.below == null) {
      walkDown(key);
    }

    if (neighbors.right == null) {
      walkRight(key);
    }
  }

  return positionDiff;
}