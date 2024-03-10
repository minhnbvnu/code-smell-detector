function compileExpression(node, proc, env) {
    switch (node.type) {
      case FUNCTION:
        proc.add(Lambda(node));
        break;

      case ASSIGN:
      case INCREMENT:
      case DECREMENT:
        throw new Error("not yet implemented");

      case IDENTIFIER:
        proc.add(GetVar(node.value));
        break;

      case DOT:
      case INDEX:
        throw new Error("not yet implemented");

      case HOOK:
        compileExpression(node.children[0], proc, env);
        var j1 = JumpT();
        proc.add(j1);
        compileExpression(node.children[1], proc, env);
        var j2 = Jump();
        proc.add(j2);
        j1.link(proc.pc());
        compileExpression(node.children[2], proc, env);
        j2.link(proc.pc());
        proc.add(Nop);
        break;

      case OR:
        compileExpression(node.children[0], proc, env);
        proc.add(Dup);
        var j1 = JumpT();
        proc.add(j1);
        proc.add(Pop);
        compileExpression(node.children[1], proc, env);
        j1.link(proc.pc());
        proc.add(Nop);
        break;

      case AND:
        compileExpression(node.children[0], proc, env);
        proc.add(Dup);
        var j1 = JumpF();
        proc.add(j1);
        proc.add(Pop);
        compileExpression(node.children[1], proc, env);
        j1.link(proc.pc());
        proc.add(Nop);
        break;

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
        compileExpression(node.children[0], proc, env);
        compileExpression(node.children[1], proc, env);
        proc.add(Binop(node.type));
        break;

      case YIELD:
        var j1 = new Fixup, j2 = new Fixup, j3 = new Fixup;
        if (node.value)
            compileExpression(node.value, proc, env);
        else
            proc.add(Undefined);
        proc.add(Yield({ "throw": j1, close: j2, send: j3 }));
        j1.address = proc.pc();
        proc.add(Mode(env.unwindThrow()));
        proc.add(Unwind);
        j2.address = proc.pc();
        proc.add(Mode(env.unwindReturn()));
        proc.add(Unwind);
        j3.address = proc.pc();
        proc.add(Nop);
        break;

      case DELETE:
      case VOID:
      case TYPEOF:
      case NOT:
      case BITWISE_NOT:
      case UNARY_PLUS:
      case UNARY_MINUS:
        compileExpression(node.children[0], proc, env);
        proc.add(Unop(node.type));
        break;

      case COMMA:
      case LIST:
      case NEW:
      case CALL:
      case NEW_WITH_ARGS:
      case ARRAY_INIT:
      case OBJECT_INIT:
      case THIS:
        throw new Error("not yet implemented");

      case NULL:
        proc.add(Null);
        break;

      case TRUE:
        proc.add(True);
        break;

      case FALSE:
        proc.add(False);
        break;

      case NUMBER:
      case STRING:
      case REGEXP:
        proc.add(Const(node.value));
        break;

      default:
        throw new Error("unrecognized expression type: " + definitions.tokens[node.type]);
    }
}