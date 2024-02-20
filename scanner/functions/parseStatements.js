function parseStatements(graph) {
    while (token !== '' && token != '}') {
      parseStatement(graph);
      if (token === ';') {
        getToken();
      }
    }
  }