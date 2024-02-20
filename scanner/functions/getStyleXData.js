function getStyleXData(data) {
  const sources = new Set();
  const resolvedStyles = {};
  crawlData(data, sources, resolvedStyles);
  return {
    sources: Array.from(sources).sort(),
    resolvedStyles
  };
}