function constantFolding(filename, transformResult) {
  return babel.transformFromAst(transformResult.ast, transformResult.code, {
    filename,
    plugins: [plugin],
    inputSourceMap: transformResult.map,
    sourceMaps: true,
    sourceFileName: filename,
    babelrc: false,
    compact: true,
    retainLines: true,
  });
}