function parseEdge(graph, from) {
    while (token === '->' || token === '--') {
      var to;
      var type = token;
      getToken();

      var subgraph = parseSubgraph(graph);
      if (subgraph) {
        to = subgraph;
      } else {
        if (tokenType != TOKENTYPE.IDENTIFIER) {
          throw newSyntaxError('Identifier or subgraph expected');
        }
        to = token;
        addNode(graph, {
          id: to
        });
        getToken();
      }

      // parse edge attributes
      var attr = parseAttributeList();

      // create edge
      var edge = createEdge(graph, from, to, type, attr);
      addEdge(graph, edge);

      from = to;
    }
  }