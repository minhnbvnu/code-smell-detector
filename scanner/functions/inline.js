function inline(filename, transformResult, options) {
  const code = transformResult.code;
  const babelOptions = {
    filename,
    plugins: [[plugin, options]],
    inputSourceMap: transformResult.map,
    sourceMaps: true,
    sourceFileName: filename,
    code: false,
    babelrc: false,
    compact: true,
  };

  return transformResult.ast
      ? babel.transformFromAst(transformResult.ast, code, babelOptions)
      : babel.transform(code, babelOptions);
}