function mark_each_block_bindings(parent, binding) {
    binding.expression.references.forEach((name2) => {
      const each_block = parent.node.scope.get_owner(name2);
      if (each_block) {
        each_block.has_binding = true;
      }
    });
    if (binding.name === "group") {
      const add_index_binding = (name2) => {
        const each_block = parent.node.scope.get_owner(name2);
        if (each_block.type === "EachBlock") {
          each_block.has_index_binding = true;
          for (const dep of each_block.expression.contextual_dependencies) {
            add_index_binding(dep);
          }
        }
      };
      for (const name2 of binding.expression.contextual_dependencies) {
        add_index_binding(name2);
      }
    }
  }