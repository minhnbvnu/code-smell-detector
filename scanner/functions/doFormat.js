function doFormat(str) {
  str = plugins.stringBefore(str);
  // allows user to override the parser
  var ast = exports.parseFn(str, exports.parseOptions);
  transform(ast, transform.BYPASS_OPTIONS);
  str = ast.toString();
  str = plugins.stringAfter(str);
  return str;
}