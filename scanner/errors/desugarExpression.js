function desugarExpression(node) {
    switch (node.type) {
      case FUNCTION:
        desugarFunction(node);
        return node;

      case GENERATOR:
      case ARRAY_COMP:
        return desugarComprehension(node);

      case ASSIGN:
        return desugarAssignment(node);

      case HOOK:
        node.children[0] = desugarExpression(node.children[0]);
        node.children[1] = desugarExpression(node.children[1]);
        node.children[2] = desugarExpression(node.children[2]);
        return node;

      case LET_BLOCK:
        node.variables.children.forEach(function(init) {
            if (init.initializer)
                init.initializer = desugarExpression(init.initializer);
        });
        node.expression = desugarExpression(node.expression);
        return node;

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
      case CALL:
      case NEW_WITH_ARGS:
      case INDEX:
        node.children[0] = desugarExpression(node.children[0]);
        node.children[1] = desugarExpression(node.children[1]);
        return node;

      case DOT:
      case DELETE:
      case VOID:
      case TYPEOF:
      case NOT:
      case BITWISE_NOT:
      case UNARY_PLUS:
      case UNARY_MINUS:
      case NEW:
      case INCREMENT:
      case DECREMENT:
        node.children[0] = desugarExpression(node.children[0]);
        return node;

      case YIELD:
        if (node.value)
            node.value = desugarExpression(node.value);
        return node;

      case COMMA:
      case LIST:
        node.children.forEach(function(child, i) {
            if (child)
                node.children[i] = desugarExpression(child);
        });
        return node;

      case ARRAY_INIT:
        node.children.forEach(function(elt, i) {
            if (elt)
                node.children[i] = desugarExpression(elt);
        });
        return node;

      case OBJECT_INIT:
        node.children.forEach(function(prop) {
            if (prop.type === GETTER || prop.type === SETTER) {
                desugarFunction(prop);
                return;
            }
            prop.children[1] = desugarExpression(prop.children[1]);
        });
        return node;

      case NULL:
      case THIS:
      case TRUE:
      case FALSE:
      case NUMBER:
      case STRING:
      case REGEXP:
      case IDENTIFIER:
        return node;

      default:
        throw new Error("unrecognized expression type: " + definitions.tokens[node.type]);
    }
}