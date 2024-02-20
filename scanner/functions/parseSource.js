function parseSource(source) {
  var lines = source.split('\n');
  var ast = esprima.parse(source, {
    loc: true,
    comment: true,
    range: true,
    sourceType: 'nonStrictModule',
  });

  /**
   * This sets up genericTransform so that it can be queried above.
   */
  var _state = {
    g: {
      source: source
    }
  };
  if (genericVisitor.test(ast, [], _state)) {
    // HACK: Mark that this file has typechecks on the comments object.
    ast.comments.typechecks = true;
    // This fills out the data for genericTransform.
    genericVisitor(function() {}, ast, [], _state);
  }
  var result = findExportDefinition(ast.body);
  if (result) {
    var definition = result.definition;
    var scopeChain = result.scopeChain;
    var data;
    var moduleName = getModuleName(ast.comments);
    if (!moduleName) {
      return null;
    }
    if (definition.type === Syntax.NewExpression &&
        definition.callee.type === Syntax.Identifier) {
      var name = definition.callee.name;
      // If the class is defined in the scopeChain, export that instead.
      scopeChain.some(function(scope) {
        if (hasOwnProperty.call(scope, name) &&
            scope[name].type === Syntax.ClassDeclaration) {
          definition = scope[name];
          return true;
        }
      });
    }

    switch (definition.type) {
      case Syntax.ClassDeclaration:
        data = getClassData(definition, _state, source, ast.comments, lines);
        data.type = 'class';
        break;
      case Syntax.ObjectExpression:
        data = getObjectData(definition, _state, source, scopeChain,
          ast.comments, lines);
        data.type = 'object';
        break;
      case Syntax.FunctionDeclaration:
      case Syntax.FunctionExpression:
        data = getFunctionData(definition, definition, _state, source,
          ast.comments, lines);
        data.type = 'function';
        break;
      default:
        data = {type: 'module'};
        break;
    }
    if (data) {
      data.line = definition.loc.start.line;
      data.name = moduleName;
      data.docblock =
        getDocBlock(definition, ast.comments, lines) ||
        getFileDocBlock(ast.comments);
      data.requires = findRequires(ast.body);
      return data;
    }
  }
  return null;
}