function parseGraph() {
    var graph = {};

    first();
    getToken();

    // optional strict keyword
    if (token === 'strict') {
      graph.strict = true;
      getToken();
    }

    // graph or digraph keyword
    if (token === 'graph' || token === 'digraph') {
      graph.type = token;
      getToken();
    }

    // optional graph id
    if (tokenType === TOKENTYPE.IDENTIFIER) {
      graph.id = token;
      getToken();
    }

    // open angle bracket
    if (token != '{') {
      throw newSyntaxError('Angle bracket { expected');
    }
    getToken();

    // statements
    parseStatements(graph);

    // close angle bracket
    if (token != '}') {
      throw newSyntaxError('Angle bracket } expected');
    }
    getToken();

    // end of file
    if (token !== '') {
      throw newSyntaxError('End of file expected');
    }
    getToken();

    // remove temporary default options
    delete graph.node;
    delete graph.edge;
    delete graph.graph;

    return graph;
  }