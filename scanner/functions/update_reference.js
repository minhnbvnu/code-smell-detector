function update_reference(contexts, n2, expression, to_ctx) {
    const find_from_context = (node2) => {
      for (let i = n2; i < contexts.length; i++) {
        const cur_context = contexts[i];
        if (cur_context.type !== "DestructuredVariable")
          continue;
        const { key } = cur_context;
        if (node2.name === key.name) {
          throw new Error(`Cannot access '${node2.name}' before initialization`);
        }
      }
      return to_ctx(node2.name);
    };
    if (expression.type === "Identifier") {
      return find_from_context(expression);
    }
    expression = clone(expression);
    walk(expression, {
      enter(node2, parent) {
        if (is_reference(node2, parent)) {
          this.replace(find_from_context(node2));
          this.skip();
        }
      }
    });
    return expression;
  }