function get_event_handler(binding, renderer, block, name2, lhs) {
    const contextual_dependencies = new Set(binding.node.expression.contextual_dependencies);
    const context = block.bindings.get(name2);
    let set_store;
    if (context) {
      const { object, property, store, snippet } = context;
      lhs = replace_object(lhs, snippet);
      contextual_dependencies.add(object.name);
      contextual_dependencies.add(property.name);
      contextual_dependencies.delete(name2);
      if (store) {
        set_store = b`${store}.set(${`$${store}`});`;
      }
    } else {
      const object = get_object(lhs);
      if (object.name[0] === "$") {
        const store = object.name.slice(1);
        set_store = b`${store}.set(${object.name});`;
      }
    }
    const value = get_value_from_dom(renderer, binding.parent, binding, contextual_dependencies);
    const mutation = b`
		${lhs} = ${value};
		${set_store}
	`;
    return {
      uses_context: binding.node.is_contextual || binding.node.expression.uses_context,
      mutation,
      contextual_dependencies,
      lhs
    };
  }