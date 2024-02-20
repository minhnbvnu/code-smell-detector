function bind_this(component, block, binding, variable) {
    const fn2 = component.get_unique_name(`${variable.name}_binding`);
    block.renderer.add_to_context(fn2.name);
    const callee = block.renderer.reference(fn2.name);
    const { contextual_dependencies, mutation } = binding.handler;
    const dependencies = binding.get_update_dependencies();
    const body = b`
		${mutation}
		${Array.from(dependencies).filter((dep) => dep[0] !== "$").filter((dep) => !contextual_dependencies.has(dep)).map((dep) => b`${block.renderer.invalidate(dep)};`)}
	`;
    if (contextual_dependencies.size) {
      const params = Array.from(contextual_dependencies).map((name2) => ({
        type: "Identifier",
        name: name2
      }));
      component.partly_hoisted.push(b`
			function ${fn2}($$value, ${params}) {
				@binding_callbacks[$$value ? 'unshift' : 'push'](() => {
					${body}
				});
			}
		`);
      const alias_map = /* @__PURE__ */ new Map();
      const args = [];
      for (let id2 of params) {
        const value = block.renderer.reference(id2.name);
        let found = false;
        if (block.variables.has(id2.name)) {
          let alias = id2.name;
          for (let i = 1; block.variables.has(alias) && !compare_node(block.variables.get(alias).init, value); alias = `${id2.name}_${i++}`)
            ;
          alias_map.set(alias, id2.name);
          id2 = { type: "Identifier", name: alias };
          found = block.variables.has(alias);
        }
        args.push(id2);
        if (!found) {
          block.add_variable(id2, value);
        }
      }
      const assign3 = block.get_unique_name(`assign_${variable.name}`);
      const unassign = block.get_unique_name(`unassign_${variable.name}`);
      block.chunks.init.push(b`
			const ${assign3} = () => ${callee}(${variable}, ${args});
			const ${unassign} = () => ${callee}(null, ${args});
		`);
      const condition = Array.from(args).map((name2) => x`${name2} !== ${block.renderer.reference(alias_map.get(name2.name) || name2.name)}`).reduce((lhs, rhs) => x`${lhs} || ${rhs}`);
      block.chunks.update.push(b`
			if (${condition}) {
				${unassign}();
				${args.map((a) => b`${a} = ${block.renderer.reference(alias_map.get(a.name) || a.name)}`)};
				${assign3}();
			}`);
      block.chunks.destroy.push(b`${unassign}();`);
      return b`${assign3}();`;
    }
    component.partly_hoisted.push(b`
		function ${fn2}($$value) {
			@binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				${body}
			});
		}
	`);
    block.chunks.destroy.push(b`${callee}(null);`);
    return b`${callee}(${variable});`;
  }