function parseAndNormalize(source, name, object) {
  if (/\?$/.test(source)) {
    source = '?' + source.substring(0, source.length - 1);
  }
  try {
    var ast = parse(source);
    return compile(normalize(ast));
  } catch (e) {
    var functionName = object.id
      ? '`' + object.id.name + '\''
      : '<anonymous>';
    throw new Error(util.format('The type `%s\' specified for %s for ' +
      'the function %s, on line %s, could not be parsed. The error given was: %s',
      source, name, functionName, object.loc.start.line, e.message
    ));
  }
}