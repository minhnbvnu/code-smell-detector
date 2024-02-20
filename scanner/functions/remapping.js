function remapping(input, loader, excludeContent) {
    const graph = buildSourceMapTree(input, loader);
    return new SourceMap(graph.traceMappings(), !!excludeContent);
  }