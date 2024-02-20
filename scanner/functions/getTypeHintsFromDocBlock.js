function getTypeHintsFromDocBlock(node, docBlocksByLine) {
  var comments = docBlocksByLine[node.loc.start.line - 1];
  if (!comments) {
    return {
      params: null,
      returns: null
    };
  }

  var params = [];
  if (node.params) {
    var paramNames = node.params.reduce(function(map, param) {
      map[param.name] = true;
      return map;
    }, {});

    var param;
    while(param = paramRe.exec(comments.value)) {

      if (!param[1]) {
        continue;
      }

      var functionName = node.id
        ? '`' + node.id.name + '\''
        : '<anonymous>';

      if (!param[3]) {
        throw new Error(util.format('Lines: %s-%s: Your @param declaration in' +
          ' function %s is missing the parameter\'s name,' +
          ' i.e. "@param {string} name"',
          comments.loc.start.line, comments.loc.end.line, functionName));
      }

      // TODO(ostrulovich) if we're really nice, we should probably check edit
      // distance and suggest the right name the user meant
      if (!(param[3] in paramNames)) {
        throw new Error(util.format('Lines: %s-%s: `%s\' is not a valid ' +
          'formal parameter of function %s. Must be one of: %s',
          comments.loc.start.line, comments.loc.end.line, param[3],
          functionName, Object.keys(paramNames).join(', ')));
      }

      params.push([param[3], param[1]]);
    }
  }
  var returnType = returnRe.exec(comments.value);
  if (returnType && returnType[1]) {
    throw new Error(util.format('Lines: %s-%s: Your @return declaration in' +
      ' function %s is incorrectly written as @returns. Remove the trailing'+
      ' \'s\'.',
      comments.loc.start.line, comments.loc.end.line, functionName));
  }
  return {
    params: params.length ? params : null,
    returns: returnType ? returnType[2] : null
  };
}