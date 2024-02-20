function getFunctionMetadata(node, state) {
  var funcMeta = {
    module: getModuleName(state),
    line: node.loc.start.line,
    column: node.loc.start.column,
    name: node.id && node.id.name
  };
  if (!funcMeta.name) {
    delete funcMeta.name;
  }
  return funcMeta;
}