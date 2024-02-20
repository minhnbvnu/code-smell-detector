function checkNodeLocation(path, line, column = null) {
  const {
    start,
    end
  } = path.node.loc;

  if (line !== start.line) {
    return false;
  }

  if (column !== null) {
    // Column numbers are represented differently between tools/engines.
    // Error.prototype.stack columns are 1-based (like most IDEs) but ASTs are 0-based.
    //
    // In practice this will probably never matter,
    // because this code matches the 1-based Error stack location for the hook Identifier (e.g. useState)
    // with the larger 0-based VariableDeclarator (e.g. [foo, setFoo] = useState())
    // so the ranges should always overlap.
    //
    // For more info see https://github.com/facebook/react/pull/21833#discussion_r666831276
    column -= 1;

    if (line === start.line && column < start.column || line === end.line && column > end.column) {
      return false;
    }
  }

  return true;
}