function resolveStatement(node, env) {
    switch (node.type) {
      case FUNCTION:
        resolveFunction(node, env);
        return;

      case VAR:
        resolveVariables(node, env);
        return;

      case CONST:
      case LET:
        throw new Error("NYI: " + definitions.tokens[node.type]);

      case MODULE:
        resolveModule(node, env);
        break;

      // imports and exports have already been dealt with at script top-level
      case EXPORT:
      case IMPORT:
        break;

      case BREAK:
      case CONTINUE:
        return;

      case THROW:
        resolveExpression(node.exception, env);
        return;

      case RETURN:
        if (node.value)
            resolveExpression(node.value, env);
        return;

      case IF:
        resolveExpression(node.condition, env);
        resolveStatement(node.thenPart, env);
        if (node.elsePart)
            resolveStatement(node.elsePart, env);
        return;

      case BLOCK:
        resolveStatements(node, env);
        return;

      case WHILE:
        resolveExpression(node.condition, env);
        resolveStatement(node.body, env);
        return;

      case DO:
        resolveStatement(node.body, env);
        resolveExpression(node.condition, env);
        return;

      case SWITCH:
        resolveExpression(node.discriminant, env);
        for (let i = 0; i < node.cases.length; i++) {
            let caseNode = node.cases[i];
            if (caseNode.caseLabel)
                resolveExpression(caseNode.caseLabel, env);
            resolveStatement(caseNode.statements, env);
        }
        break;

      case FOR:
        if (node.setup) {
            switch (node.setup.type) {
              case LET:
                throw new Error("NYI: let");

              case VAR:
                resolveVariables(node.setup, env);
                break;

              default:
                resolveExpression(node.setup, env);
                break;
            }
        }
        if (node.condition)
            resolveExpression(node.condition, env);
        if (node.update)
            resolveExpression(node.update, env);
        resolveStatement(node.body, env);
        break;

      case FOR_IN:
        if (node.varDecl)
            resolveVariables(node.varDecl, env);
        else
            resolveLHS(node.iterator, env);

        resolveExpression(node.object, env);
        break;

      case TRY:
        resolveStatement(node.tryBlock, env);
        for (let i = 0; i < node.catchClauses.length; i++)
            resolveCatch(node.catchClauses[i], env);
        if (node.finallyBlock)
            resolveStatement(node.finallyBlock, env);
        return;

      case DEBUGGER:
        return;

      case SEMICOLON:
        resolveExpression(node.expression, env);
        return;

      case LABEL:
        resolveStatement(node.statement, env);
        return;

      default:
        throw new Error("NYI: " + definitions.tokens[node.type]);
    }
}