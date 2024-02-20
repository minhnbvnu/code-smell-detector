function loadNode() {
  return {
    namespaces: process.env.DEBUG || '',
    colors: [6, 2, 3, 4, 5, 1],
    useColors: true,
    formatArgs: formatNodeArgs
  };
}