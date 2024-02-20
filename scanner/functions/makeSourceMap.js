function makeSourceMap() {
  return {
    version: 3,
    file: inputRelative,
    names: [],
    mappings: '',
    sources: [inputRelative],
    sourcesContent: [contents],
  };
}