function parseNodeStatement(graph, id) {
    // node statement
    var node = {
      id: id
    };
    var attr = parseAttributeList();
    if (attr) {
      node.attr = attr;
    }
    addNode(graph, node);

    // edge statements
    parseEdge(graph, id);
  }