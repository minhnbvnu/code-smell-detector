function handleAssignmentExpression(expr, scopeChain, multipleExports) {
  while (!isExportsOrModuleExpression(expr)) {
    if (expr.type === Syntax.AssignmentExpression &&
        expr.right.type === Syntax.AssignmentExpression) {
      expr = expr.right;
    } else {
      return;
    }
  }

  var definition = resolveToValue(
    expr.right,
    scopeChain
  );

  if (!definition) {
    // handle empty var declaration, e.g. "var x; ... module.exports = x"
    if (expr.right.type === Syntax.Identifier) {
      var found = false;
      scopeChain.some(function(scope) {
        if (scope[expr.right.name] === null) {
          return found = true;
        }
      });
      if (found) {
        // fake definition so we still return something at least
        return {
          definition: {
            type: Syntax.VariableDeclaration,
            loc: expr.loc,
            isSynthesized: true
          },
          scopeChain: scopeChain
        };
      }
    }
    return;
  }

  var leftExpression = expr.left;
  var leftExpressions = expressionToArray(leftExpression);
  if (leftExpressions[0] === 'exports') {
    // exports.A = A
    if (leftExpressions.length === 2 && leftExpression.property) {
      // The 2nd element is the field name
      multipleExports.push({
        key: leftExpression.property,
        value: definition
      });
    }
  } else if (definition) {
    // module.exports = A
    return {
      definition: definition,
      scopeChain: scopeChain
    };
  }
}