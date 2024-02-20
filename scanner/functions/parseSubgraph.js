function parseSubgraph(graph) {
    var subgraph = null;

    // optional subgraph keyword
    if (token === 'subgraph') {
      subgraph = {};
      subgraph.type = 'subgraph';
      getToken();

      // optional graph id
      if (tokenType === TOKENTYPE.IDENTIFIER) {
        subgraph.id = token;
        getToken();
      }
    }

    // open angle bracket
    if (token === '{') {
      getToken();

      if (!subgraph) {
        subgraph = {};
      }
      subgraph.parent = graph;
      subgraph.node = graph.node;
      subgraph.edge = graph.edge;
      subgraph.graph = graph.graph;

      // statements
      parseStatements(subgraph);

      // close angle bracket
      if (token != '}') {
        throw newSyntaxError('Angle bracket } expected');
      }
      getToken();

      // remove temporary default options
      delete subgraph.node;
      delete subgraph.edge;
      delete subgraph.graph;
      delete subgraph.parent;

      // register at the parent graph
      if (!graph.subgraphs) {
        graph.subgraphs = [];
      }
      graph.subgraphs.push(subgraph);
    }

    return subgraph;
  }