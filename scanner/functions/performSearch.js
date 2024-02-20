function performSearch(queryString) {
  debugger;
  appState.hasGraph = true;
  appState.progress.reset();

  qs.set('query', queryString);
  if (lastBuilder) {
    lastBuilder.dispose();
  }

  lastBuilder = buildGraph(queryString, appState.pattern, appState.maxDepth, appState.progress);
  appState.graph = Object.freeze(lastBuilder.graph);
  return lastBuilder.graph;
}