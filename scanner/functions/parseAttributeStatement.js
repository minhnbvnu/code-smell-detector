function parseAttributeStatement(graph) {
    // attribute statements
    if (token === 'node') {
      getToken();

      // node attributes
      graph.node = parseAttributeList();
      return 'node';
    } else if (token === 'edge') {
      getToken();

      // edge attributes
      graph.edge = parseAttributeList();
      return 'edge';
    } else if (token === 'graph') {
      getToken();

      // graph attributes
      graph.graph = parseAttributeList();
      return 'graph';
    }

    return null;
  }