function add_action(block, target, action) {
    const { expression, template_scope } = action;
    let snippet;
    let dependencies;
    if (expression) {
      snippet = expression.manipulate(block);
      dependencies = expression.dynamic_dependencies();
    }
    const id2 = block.get_unique_name(`${action.name.replace(regex_invalid_variable_identifier_characters, "_")}_action`);
    block.add_variable(id2);
    const [obj, ...properties2] = action.name.split(".");
    const fn2 = is_contextual(action.component, template_scope, obj) ? block.renderer.reference(obj) : obj;
    if (properties2.length) {
      const member_expression = properties2.reduce((lhs, rhs) => x`${lhs}.${rhs}`, fn2);
      block.event_listeners.push(x`@action_destroyer(${id2} = ${member_expression}(${target}, ${snippet}))`);
    } else {
      block.event_listeners.push(x`@action_destroyer(${id2} = ${fn2}.call(null, ${target}, ${snippet}))`);
    }
    if (dependencies && dependencies.length > 0) {
      let condition = x`${id2} && @is_function(${id2}.update)`;
      if (dependencies.length > 0) {
        condition = x`${condition} && ${block.renderer.dirty(dependencies)}`;
      }
      block.chunks.update.push(b`if (${condition}) ${id2}.update.call(null, ${snippet});`);
    }
  }