function desugarStatement(node) {
    switch (node.type) {
      case FUNCTION:
        desugarFunction(node);
        break;

      case VAR:
      case CONST:
      case LET:
        desugarDeclaration(node);
        break;

      case LET_BLOCK:
        node.variables.children.forEach(function(init) {
            if (init.initializer)
                init.initializer = desugarExpression(init.initializer);
        });
        if (node.block)
            desugarStatement(node.block);
        else
            node.expression = desugarExpression(node.expression);
        break;

      case BREAK:
      case CONTINUE:
      case DEBUGGER:
        break;

      case THROW:
        node.exception = desugarExpression(node.exception);
        break;

      case RETURN:
        if (node.value)
            node.value = desugarExpression(node.value);
        break;

      case IF:
        node.condition = desugarExpression(node.condition);
        desugarStatement(node.thenPart);
        if (node.elsePart)
            desugarStatement(node.elsePart);
        return;

      case BLOCK:
        desugarStatements(node);
        break;

      case WHILE:
        node.condition = desugarExpression(node.condition);
        desugarStatement(node.body);
        return;

      case DO:
        desugarStatement(node.body);
        node.condition = desugarExpression(node.condition);
        return;

      case SWITCH:
        node.discriminant = desugarExpression(node.discriminant);
        var cases = node.cases;
        cases.forEach(function(caseNode) {
            if (caseNode.caseLabel)
                caseNode.caseLabel = desugarExpression(caseNode.caseLabel);
            desugarStatements(caseNode.statements);
        });
        break;

      case FOR:
        if (node.setup) {
            switch (node.setup.type) {
              case LET:
              case VAR:
                desugarDeclaration(node.setup);
                break;

              default:
                node.setup = desugarExpression(node.setup);
                break;
            }
        }
        if (node.condition)
            node.condition = desugarExpression(node.condition);
        if (node.update)
            node.update = desugarExpression(node.update);
        desugarStatement(node.body);
        break;

      case FOR_IN:
        desugarForInDeclaration(node);
        node.object = desugarExpression(node.object);
        desugarStatement(node.body);
        break;

      case TRY:
        desugarStatement(node.tryBlock);
        desugarCatchClauses(node);
        if (node.finallyBlock)
            desugarStatement(node.finallyBlock);
        break;

      case SEMICOLON:
        if (node.expression)
            node.expression = desugarExpression(node.expression);
        break;

      case LABEL:
        desugarStatement(node.statement);
        break;

      case WITH:
        node.object = desugarExpression(node.object);
        desugarStatement(node.body);
        break;

      case MODULE:
      case IMPORT:
      case EXPORT:
      default:
        throw new Error("not yet implemented: " + definitions.tokens[node.type]);
    }
}