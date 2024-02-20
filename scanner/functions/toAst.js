function toAst(code) {
  return transform(code, {...babelOptions, code: false}).ast;
}