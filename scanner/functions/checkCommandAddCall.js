function checkCommandAddCall(node) {
    const args = node.arguments;
    if (args.length !== 2 && args.length !== 3) {
      return;
    }

    const callee = context.getSourceCode().getText(node.callee);
    if (callee !== 'atom.commands.add') {
      return;
    }

    const firstValue = resolveValue(args[0], context);
    if (firstValue == null) {
      // Another common pattern for atom.commands.add. Be lazy and just get the string..
      const stringValue = context.getSourceCode().getText(args[0]);
      if (
        stringValue.replace(/\s/g, '') === 'atom.views.getView(atom.workspace)'
      ) {
        context.report({
          node: node.callee,
          message: WORKSPACE_VIEW_LOOKUP_ERROR,
        });
      } else {
        return;
      }
    } else if (firstValue !== 'atom-workspace') {
      return;
    }

    if (args[1].type === 'Literal') {
      checkLiterals([args[1]], context);
    } else if (args[1].type === 'ObjectExpression') {
      const commands = [];
      args[1].properties.forEach(prop => {
        if (prop.key.type === 'Literal') {
          commands.push(prop.key);
        }
      });
      checkLiterals(commands, context);
    } else if (resolveValue(args[1], context) != null) {
      context.report({
        node: args[1],
        message: COMMAND_LITERAL_ERROR,
      });
    }
    // Unresolvable or dynamic expressions are ignored.
  }