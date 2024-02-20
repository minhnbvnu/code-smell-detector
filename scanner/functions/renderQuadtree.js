function renderQuadtree(node) {
    context.strokeStyle = '#eee';
    context.strokeRect(node.bounds.x, node.bounds.y, node.bounds.width, node.bounds.height);

    // render the subnodes so long as this node is a branch and has subnodes
    if (node._b && node._s.length) {
      for (let i = 0; i < 4; i++) {
        renderQuadtree(node._s[i]);
      }
    }
  }