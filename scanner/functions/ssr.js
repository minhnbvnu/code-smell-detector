function ssr(component, options) {
    const renderer = new Renderer$1({
      name: component.name
    });
    const { name: name2 } = component;
    renderer.render(trim(component.fragment.children), Object.assign({
      locate: component.locate
    }, options));
    const literal2 = renderer.pop();
    const css = options.customElement ? { code: null, map: null } : component.stylesheet.render(options.filename, true);
    const uses_rest = component.var_lookup.has("$$restProps");
    const props = component.vars.filter((variable) => !variable.module && variable.export_name);
    const rest = uses_rest ? b`let $$restProps = @compute_rest_props($$props, [${props.map((prop) => `"${prop.export_name}"`).join(",")}]);` : null;
    const uses_slots = component.var_lookup.has("$$slots");
    const slots = uses_slots ? b`let $$slots = @compute_slots(#slots);` : null;
    const reactive_stores = component.vars.filter((variable) => variable.name[0] === "$" && variable.name[1] !== "$");
    const reactive_store_subscriptions = reactive_stores.filter((store) => {
      const variable = component.var_lookup.get(store.name.slice(1));
      return !variable || variable.hoistable;
    }).map(({ name: name3 }) => {
      const store_name = name3.slice(1);
      return b`
				${component.compile_options.dev && b`@validate_store(${store_name}, '${store_name}');`}
				${`$$unsubscribe_${store_name}`} = @subscribe(${store_name}, #value => ${name3} = #value)
			`;
    });
    const reactive_store_unsubscriptions = reactive_stores.map(({ name: name3 }) => b`${`$$unsubscribe_${name3.slice(1)}`}()`);
    const reactive_store_declarations = reactive_stores.map(({ name: name3 }) => {
      const store_name = name3.slice(1);
      const store = component.var_lookup.get(store_name);
      if (store && store.reassigned) {
        const unsubscribe = `$$unsubscribe_${store_name}`;
        const subscribe = `$$subscribe_${store_name}`;
        return b`let ${name3}, ${unsubscribe} = @noop, ${subscribe} = () => (${unsubscribe}(), ${unsubscribe} = @subscribe(${store_name}, $$value => ${name3} = $$value), ${store_name})`;
      }
      return b`let ${name3}, ${`$$unsubscribe_${store_name}`};`;
    });
    if (component.ast.instance) {
      let scope = component.instance_scope;
      const map = component.instance_scope_map;
      walk(component.ast.instance.content, {
        enter(node2) {
          if (map.has(node2)) {
            scope = map.get(node2);
          }
        },
        leave(node2) {
          if (map.has(node2)) {
            scope = scope.parent;
          }
          if (node2.type === "AssignmentExpression" || node2.type === "UpdateExpression") {
            const assignee = node2.type === "AssignmentExpression" ? node2.left : node2.argument;
            const names = new Set(extract_names(assignee));
            const to_invalidate = /* @__PURE__ */ new Set();
            for (const name3 of names) {
              const variable = component.var_lookup.get(name3);
              if (variable && !variable.hoistable && !variable.global && !variable.module && (variable.subscribable || variable.name[0] === "$")) {
                to_invalidate.add(variable.name);
              }
            }
            if (to_invalidate.size) {
              this.replace(invalidate({ component }, scope, node2, to_invalidate, true));
            }
          }
        }
      });
    }
    component.rewrite_props(({ name: name3, reassigned }) => {
      const value = `$${name3}`;
      let insert = reassigned ? b`${`$$subscribe_${name3}`}()` : b`${`$$unsubscribe_${name3}`} = @subscribe(${name3}, #value => $${value} = #value)`;
      if (component.compile_options.dev) {
        insert = b`@validate_store(${name3}, '${name3}'); ${insert}`;
      }
      return insert;
    });
    const instance_javascript = component.extract_javascript(component.ast.instance);
    const parent_bindings = instance_javascript ? component.vars.filter((variable) => !variable.module && variable.export_name).map((prop) => {
      return b`if ($$props.${prop.export_name} === void 0 && $$bindings.${prop.export_name} && ${prop.name} !== void 0) $$bindings.${prop.export_name}(${prop.name});`;
    }) : [];
    const injected = Array.from(component.injected_reactive_declaration_vars).filter((name3) => {
      const variable = component.var_lookup.get(name3);
      return variable.injected;
    });
    const reactive_declarations = component.reactive_declarations.map((d2) => {
      const body = d2.node.body;
      let statement = b`${body}`;
      if (!d2.declaration) {
        statement = b`$: { ${statement} }`;
      }
      return statement;
    });
    const main = renderer.has_bindings ? b`
			let $$settled;
			let $$rendered;

			do {
				$$settled = true;

				${reactive_declarations}

				$$rendered = ${literal2};
			} while (!$$settled);

			${reactive_store_unsubscriptions}

			return $$rendered;
		` : b`
			${reactive_declarations}

			${reactive_store_unsubscriptions}

			return ${literal2};`;
    const blocks = [
      ...injected.map((name3) => b`let ${name3};`),
      rest,
      slots,
      ...reactive_store_declarations,
      ...reactive_store_subscriptions,
      instance_javascript,
      ...parent_bindings,
      css.code && b`$$result.css.add(#css);`,
      main
    ].filter(Boolean);
    const css_sourcemap_enabled = check_enable_sourcemap(options.enableSourcemap, "css");
    const js2 = b`
		${css.code ? b`
		const #css = {
			code: "${css.code}",
			map: ${css_sourcemap_enabled && css.map ? string_literal(css.map.toString()) : "null"}
		};` : null}

		${component.extract_javascript(component.ast.module)}

		${component.fully_hoisted}

		const ${name2} = @create_ssr_component(($$result, $$props, $$bindings, #slots) => {
			${blocks}
		});
	`;
    return { js: js2, css };
  }