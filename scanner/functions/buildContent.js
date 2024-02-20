function buildContent(content, filename, destination, babelOptions = {}) {
  babelOptions.filename = filename;
  const result = transform(content, babelOptions);
  outputFileSync(destination, result.code, {encoding: 'utf8'});
}