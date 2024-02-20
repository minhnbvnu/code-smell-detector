function compileStatement(node, proc, env, labels) {
    switch (node.type) {
      case FUNCTION:
      case DEBUGGER:
      case MODULE:
      case IMPORT:
      case EXPORT:
        break;

      case VAR:
      case CONST:
      case LET:
        throw new Error("not yet implemented");

      case BREAK:
        var mode = env.unwindBreak(node.label);
        if (mode.scopes)
            proc.add(Unbind(mode.scopes));
        if (!mode.unwind.length) {
            proc.add(Jump(mode.goal));
        } else {
            proc.add(Mode(mode));
            proc.add(Unwind);
        }
        break;

      case CONTINUE:
        throw new Error("not yet implemented");

      case SWITCH:
        throw new Error("not yet implemented");

      case THROW:
        compileExpression(node.exception, proc, env);
        proc.add(Mode(env.unwindThrow()));
        proc.add(Unwind);
        break;

      case RETURN:
        compileExpression(node.value, proc, env);
        proc.add(Mode(env.unwindReturn()));
        proc.add(Unwind);
        break;

      case IF:
        compileExpression(node.condition, proc, env);
        var j1 = JumpF();
        proc.add(j1);
        compileStatement(node.thenPart, proc, env);
        var join = proc.pc();
        if (node.elsePart) {
            var j2 = Jump();
            proc.add(j2);
            j1.link(proc.pc());
            compileStatement(node.elsePart, proc, env);
            j2.link(proc.pc());
        } else {
            j1.link(join);
        }
        proc.add(Nop);
        break;

      case SCRIPT:
      case BLOCK:
        var a = node.children;
        for (var i = 0, n = a.length; i < n; i++)
            compileStatement(a[i], proc, env);
        break;

      case TRY:
        var l1 = new Fixup, l2 = new Fixup;
        var hasCatch = !!node.catchClauses.length;
        var hasFinally = !!node.finallyBlock;
        var bodyEnv = hasCatch && hasFinally
            ? env.extend({ "catch": l1, "finally": l2 })
        : hasCatch
            ? env.extend({ "catch": l1 })
        : env.extend({ "finally": l2 });
        // try block
        compileStatement(node.tryBlock, proc, bodyEnv);
        var j1;
        if (hasCatch) {
            var catchEnv;
            // if there's a finally block, need an explicit jump from end of try to finally
            if (hasFinally) {
                j1 = Jump();
                proc.add(j1);
                catchEnv = env.extend({ "finally": j2 });
            } else {
                catchEnv = env;
            }
            // catch block
            l1.address = proc.pc();
            compileCatchClause(node.catchClauses[0], proc, catchEnv);
        }
        if (hasFinally) {
            // if there's a catch block, need an explicit jump from end of try to finally
            if (hasCatch)
                j1.link(proc.pc());
            l2.address = proc.pc();
            // finally block
            compileStatement(node.finallyBlock, proc, env);
            proc.add(Unwind);
        }
        break;

      case WHILE:
      case DO:
      case FOR:
      case FOR_IN:
        compileLoop(node, proc, env, labels);
        break;

      case LABEL:
        if (!labels)
            labels = new Dict();
        while (node.type === LABEL) {
            labels.set(node.label, true);
            node = node.statement;
        }
        var l1 = new Fixup;
        compileStatement(node, proc, env.extend({
            "break": { goal: l1, labels: labels }
        }), labels);
        l1.address = proc.pc();
        proc.add(Nop);
        break;

      case SEMICOLON:
        if (node.expression) {
            compileExpression(node.expression, proc, env);
            proc.add(Pop);
        }
        break;

      default:
        throw new Error("unrecognized statement type: " + definitions.tokens[node.type]);
    }
}