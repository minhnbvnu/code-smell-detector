function get_binding_group(renderer, binding, block) {
    const value = binding.node;
    const { parts } = flatten_reference(value.raw_expression);
    let keypath = parts.join(".");
    const contexts = [];
    const contextual_dependencies = /* @__PURE__ */ new Set();
    const { template_scope } = value.expression;
    const add_contextual_dependency = (dep) => {
      contextual_dependencies.add(dep);
      const owner = template_scope.get_owner(dep);
      if (owner.type === "EachBlock") {
        for (const dep2 of owner.expression.contextual_dependencies) {
          add_contextual_dependency(dep2);
        }
      }
    };
    for (const dep of value.expression.contextual_dependencies) {
      add_contextual_dependency(dep);
    }
    for (const dep of contextual_dependencies) {
      const context = block.bindings.get(dep);
      let key;
      let name2;
      if (context) {
        key = context.object.name;
        name2 = context.property.name;
      } else {
        key = dep;
        name2 = dep;
      }
      keypath = `${key}@${keypath}`;
      contexts.push(name2);
    }
    if (!renderer.binding_groups.has(keypath)) {
      const index = renderer.binding_groups.size;
      const list_dependencies = /* @__PURE__ */ new Set();
      let parent = value.parent;
      while (parent) {
        if (parent.type === "EachBlock") {
          for (const dep of parent.expression.dynamic_dependencies()) {
            list_dependencies.add(dep);
          }
        }
        parent = parent.parent;
      }
      const elements = /* @__PURE__ */ new Map();
      contexts.forEach((context) => {
        renderer.add_to_context(context, true);
      });
      renderer.binding_groups.set(keypath, {
        binding_group: () => {
          let obj = x`$$binding_groups[${index}]`;
          if (contexts.length > 0) {
            contexts.forEach((secondary_index) => {
              obj = x`${obj}[${secondary_index}]`;
            });
          }
          return obj;
        },
        contexts,
        list_dependencies,
        keypath,
        add_element(block2, element) {
          if (!elements.has(block2)) {
            elements.set(block2, []);
          }
          elements.get(block2).push(element);
        },
        render(block2) {
          const local_name = block2.get_unique_name("binding_group");
          const binding_group2 = block2.renderer.reference("$$binding_groups");
          block2.add_variable(local_name);
          if (contexts.length > 0) {
            const indexes = { type: "ArrayExpression", elements: contexts.map((name2) => block2.renderer.reference(name2)) };
            block2.chunks.init.push(b`${local_name} = @init_binding_group_dynamic(${binding_group2}[${index}], ${indexes})`);
            block2.chunks.update.push(b`if (${block2.renderer.dirty(Array.from(list_dependencies))}) ${local_name}.u(${indexes})`);
          } else {
            block2.chunks.init.push(b`${local_name} = @init_binding_group(${binding_group2}[${index}])`);
          }
          block2.chunks.hydrate.push(b`${local_name}.p(${elements.get(block2)})`);
          block2.chunks.destroy.push(b`${local_name}.r()`);
        }
      });
    }
    const binding_group = renderer.binding_groups.get(keypath);
    block.binding_groups.add(binding_group);
    return binding_group;
  }