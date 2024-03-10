function resolveExpression(node, env) {
    if (!node)
        return;

    switch (node.type) {
      case FUNCTION:
        resolveFunction(node, env);
        break;

      case ASSIGN:
        resolveLHS(node.children[0], env);
        resolveExpression(node.children[1], env);
        break;

      case INCREMENT:
      case DECREMENT:
        resolveLHS(node.children[0], env);
        break;

      case IDENTIFIER:
      case DOT:
      case INDEX:
        resolvePath(node, env);
        break;

      case HOOK:
        resolveExpression(node.children[0], env);
        resolveExpression(node.children[1], env);
        resolveExpression(node.children[2], env);
        break;

      case OR:
      case AND:
      case BITWISE_OR:
      case BITWISE_XOR:
      case BITWISE_AND:
      case EQ:
      case NE:
      case STRICT_EQ:
      case STRICT_NE:
      case LT:
      case LE:
      case GT:
      case GE:
      case IN:
      case INSTANCEOF:
      case LSH:
      case RSH:
      case URSH:
      case PLUS:
      case MINUS:
      case MUL:
      case DIV:
      case MOD:
        resolveExpression(node.children[0], env);
        resolveExpression(node.children[1], env);
        break;

      case DELETE:
        switch (node.children[0].type) {
          case IDENTIFIER:
            throw new SyntaxError("deleting a variable is deprecated");

          case DOT:
          case INDEX:
            {
                let def = resolvePath(node, env);
                if (def)
                    throw new SyntaxError("attempt to delete module import");
                break;
            }

          default:
            resolveExpression(node.children[0], env);
        }
        break;

      case VOID:
      case TYPEOF:
      case NOT:
      case BITWISE_NOT:
      case UNARY_PLUS:
      case UNARY_MINUS:
        resolveExpression(node.children[0], env);
        break;

      case COMMA:
      case LIST:
        for (let i in node.children)
            resolveExpression(node.children[i], env);
        break;

      case NEW:
        resolveExpression(node.children[0], env);
        break;

      case CALL:
        // save the static env so direct eval can resolve its argument program
        if (isDirectEval(node.children[0]))
            node.staticEnv = env;
        // FALL THROUGH

      case NEW_WITH_ARGS:
        resolveExpression(node.children[0], env);
        resolveExpression(node.children[1], env);
        break;

      case ARRAY_INIT:
        for (let i in node.children) {
            let elt = node.children[i];
            if (elt)
                resolveExpression(elt, env);
        }
        break;

      case OBJECT_INIT:
        for (let i in node.children)
            resolveExpression(node.children[i].children[1], env);
        break;

      case NULL:
      case THIS:
      case TRUE:
      case FALSE:
      case NUMBER:
      case STRING:
      case REGEXP:
        break;

      default:
        throw new Error("NYI: " + definitions.tokens[node.type]);
    }
}