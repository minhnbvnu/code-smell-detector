function findExportDefinition(ast) {
  var multipleExports = [];
  var singleExport;
  traverseFlat(ast, function(node, scopeChain) {
    if (singleExport) {
      return false;
    }
    if (node.type === Syntax.VariableDeclaration) {
      node.declarations.forEach(function (decl) {
        if (!singleExport && decl.init &&
            decl.init.type === Syntax.AssignmentExpression) {
          singleExport = handleAssignmentExpression(
            decl.init,
            scopeChain,
            multipleExports
          );
        }
      });
      return false;
    }
    if (!isAssignmentStatement(node)) {
      return false;
    }
    if (node.expression) {
      singleExport = handleAssignmentExpression(
        node.expression,
        scopeChain,
        multipleExports
      );
    }
  });

  // NOT going to handle the f**ked up case where in the same file we have
  // module.exports = A; exports.b = b;
  if (singleExport) {
    return singleExport;
  }

  if (multipleExports.length === 1) {
    return {
      scopeChain: [],
      definition: multipleExports[0].value
    };
  }

  if (multipleExports.length > 0) {
    // Synthesize an ObjectExpression union all exports
    var properties = multipleExports.map(function(element) {
      var key = element.key;
      var value = element.value;
      return {
        type: Syntax.Property,
        key: key,
        value: value,
        loc: {
          start: { line: key.loc.start.line, column: key.loc.start.column },
          end: { line: value.loc.end.line, column: value.loc.end.column }
        },
        range: [ key.range[0], value.range[1] ]
      };
    });
    return {
      scopeChain: [],
      definition: {
        isSynthesized: true,
        type: Syntax.ObjectExpression,
        properties: properties,
        // Use the first export statement location
        loc: properties[0].loc
      }
    };
  }

  return null;
}