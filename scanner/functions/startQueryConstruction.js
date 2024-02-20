function startQueryConstruction() {
    graph.addNode(entryWord, {depth: 0});
    fetchNext(entryWord);
  }