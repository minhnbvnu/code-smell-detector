function dom(component, options) {
    const { name: name2 } = component;
    const renderer = new Renderer(component, options);
    const { block } = renderer;
    block.has_outro_method = true;
    if (options.customElement)
      block.chunks.create.push(b`this.c = @noop;`);
    const body = [];
    if (renderer.file_var) {
      const file = component.file ? x`"${component.file}"` : x`undefined`;
      body.push(b`const ${renderer.file_var} = ${file};`);
    }
    const css = component.stylesheet.render(options.filename, !options.customElement);
    const css_sourcemap_enabled = check_enable_sourcemap(options.enableSourcemap, "css");
    if (css_sourcemap_enabled) {
      css.map = apply_preprocessor_sourcemap(options.filename, css.map, options.sourcemap);
    } else {
      css.map = null;
    }
    const styles = css_sourcemap_enabled && component.stylesheet.has_styles && options.dev ? `${css.code}
/*# sourceMappingURL=${css.map.toUrl()} */` : css.code;
    const add_css = component.get_unique_name("add_css");
    const should_add_css = !options.customElement && !!styles && options.css === "injected";
    if (should_add_css) {
      body.push(b`
			function ${add_css}(target) {
				@append_styles(target, "${component.stylesheet.id}", "${styles}");
			}
		`);
    }
    const blocks = renderer.blocks.slice().reverse();
    push_array$1(body, blocks.map((block2) => {
      if (block2.render)
        return block2.render();
      return block2;
    }));
    if (options.dev && !options.hydratable) {
      block.chunks.claim.push(b`throw new @_Error("options.hydrate only works if the component was compiled with the \`hydratable: true\` option");`);
    }
    const uses_slots = component.var_lookup.has("$$slots");
    let compute_slots;
    if (uses_slots) {
      compute_slots = b`
			const $$slots = @compute_slots(#slots);
		`;
    }
    const uses_props = component.var_lookup.has("$$props");
    const uses_rest = component.var_lookup.has("$$restProps");
    const $$props = uses_props || uses_rest ? "$$new_props" : "$$props";
    const props = component.vars.filter((variable) => !variable.module && variable.export_name);
    const writable_props = props.filter((variable) => variable.writable);
    const omit_props_names = component.get_unique_name("omit_props_names");
    const compute_rest = x`@compute_rest_props($$props, ${omit_props_names.name})`;
    const rest = uses_rest ? b`
		const ${omit_props_names.name} = [${props.map((prop) => `"${prop.export_name}"`).join(",")}];
		let $$restProps = ${compute_rest};
	` : null;
    const set = uses_props || uses_rest || writable_props.length > 0 || component.slots.size > 0 ? x`
			${$$props} => {
				${uses_props && renderer.invalidate("$$props", x`$$props = @assign(@assign({}, $$props), @exclude_internal_props($$new_props))`)}
				${uses_rest && !uses_props && x`$$props = @assign(@assign({}, $$props), @exclude_internal_props($$new_props))`}
				${uses_rest && renderer.invalidate("$$restProps", x`$$restProps = ${compute_rest}`)}
				${writable_props.map((prop) => b`if ('${prop.export_name}' in ${$$props}) ${renderer.invalidate(prop.name, x`${prop.name} = ${$$props}.${prop.export_name}`)};`)}
				${component.slots.size > 0 && b`if ('$$scope' in ${$$props}) ${renderer.invalidate("$$scope", x`$$scope = ${$$props}.$$scope`)};`}
			}
		` : null;
    const accessors = [];
    const not_equal = component.component_options.immutable ? x`@not_equal` : x`@safe_not_equal`;
    let missing_props_check;
    let inject_state;
    let capture_state;
    let props_inject;
    props.forEach((prop) => {
      const variable = component.var_lookup.get(prop.name);
      if (!variable.writable || component.component_options.accessors) {
        accessors.push({
          type: "MethodDefinition",
          kind: "get",
          key: { type: "Identifier", name: prop.export_name },
          value: x`function() {
					return ${prop.hoistable ? prop.name : x`this.$$.ctx[${renderer.context_lookup.get(prop.name).index}]`}
				}`
        });
      } else if (component.compile_options.dev) {
        accessors.push({
          type: "MethodDefinition",
          kind: "get",
          key: { type: "Identifier", name: prop.export_name },
          value: x`function() {
					throw new @_Error("<${component.tag}>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
				}`
        });
      }
      if (component.component_options.accessors) {
        if (variable.writable && !renderer.readonly.has(prop.name)) {
          accessors.push({
            type: "MethodDefinition",
            kind: "set",
            key: { type: "Identifier", name: prop.export_name },
            value: x`function(${prop.name}) {
						this.$$set({ ${prop.export_name}: ${prop.name} });
						@flush();
					}`
          });
        } else if (component.compile_options.dev) {
          accessors.push({
            type: "MethodDefinition",
            kind: "set",
            key: { type: "Identifier", name: prop.export_name },
            value: x`function(value) {
						throw new @_Error("<${component.tag}>: Cannot set read-only property '${prop.export_name}'");
					}`
          });
        }
      } else if (component.compile_options.dev) {
        accessors.push({
          type: "MethodDefinition",
          kind: "set",
          key: { type: "Identifier", name: prop.export_name },
          value: x`function(value) {
					throw new @_Error("<${component.tag}>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
				}`
        });
      }
    });
    component.instance_exports_from.forEach((exports_from) => {
      const import_declaration = Object.assign(Object.assign({}, exports_from), { type: "ImportDeclaration", specifiers: [], source: exports_from.source });
      component.imports.push(import_declaration);
      exports_from.specifiers.forEach((specifier) => {
        if (component.component_options.accessors) {
          const name3 = component.get_unique_name(specifier.exported.name);
          import_declaration.specifiers.push(Object.assign(Object.assign({}, specifier), { type: "ImportSpecifier", imported: specifier.local, local: name3 }));
          accessors.push({
            type: "MethodDefinition",
            kind: "get",
            key: { type: "Identifier", name: specifier.exported.name },
            value: x`function() {
						return ${name3}
					}`
          });
        } else if (component.compile_options.dev) {
          accessors.push({
            type: "MethodDefinition",
            kind: "get",
            key: { type: "Identifier", name: specifier.exported.name },
            value: x`function() {
						throw new @_Error("<${component.tag}>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
					}`
          });
        }
      });
    });
    if (component.compile_options.dev) {
      const expected = props.filter((prop) => prop.writable && !prop.initialised);
      if (expected.length) {
        missing_props_check = b`
				$$self.$$.on_mount.push(function () {
					${expected.map((prop) => b`
					if (${prop.name} === undefined && !(('${prop.export_name}' in $$props) || $$self.$$.bound[$$self.$$.props['${prop.export_name}']])) {
						@_console.warn("<${component.tag}> was created without expected prop '${prop.export_name}'");
					}`)}
				});
			`;
      }
      const capturable_vars = component.vars.filter((v2) => !v2.internal && !v2.global && !v2.name.startsWith("$$"));
      if (capturable_vars.length > 0) {
        capture_state = x`() => ({ ${capturable_vars.map((prop) => p`${prop.name}`)} })`;
      }
      const injectable_vars = capturable_vars.filter((v2) => !v2.module && v2.writable && v2.name[0] !== "$");
      if (uses_props || injectable_vars.length > 0) {
        inject_state = x`
				${$$props} => {
					${uses_props && renderer.invalidate("$$props", x`$$props = @assign(@assign({}, $$props), $$new_props)`)}
					${injectable_vars.map((v2) => b`if ('${v2.name}' in $$props) ${renderer.invalidate(v2.name, x`${v2.name} = ${$$props}.${v2.name}`)};`)}
				}
			`;
        props_inject = b`
				if ($$props && "$$inject" in $$props) {
					$$self.$inject_state($$props.$$inject);
				}
			`;
      }
    }
    if (component.ast.instance) {
      let scope = component.instance_scope;
      const map = component.instance_scope_map;
      let execution_context = null;
      walk(component.ast.instance.content, {
        enter(node2) {
          if (map.has(node2)) {
            scope = map.get(node2);
            if (!execution_context && !scope.block) {
              execution_context = node2;
            }
          } else if (!execution_context && node2.type === "LabeledStatement" && node2.label.name === "$") {
            execution_context = node2;
          }
        },
        leave(node2) {
          if (map.has(node2)) {
            scope = scope.parent;
          }
          if (execution_context === node2) {
            execution_context = null;
          }
          if (node2.type === "AssignmentExpression" || node2.type === "UpdateExpression") {
            const assignee = node2.type === "AssignmentExpression" ? node2.left : node2.argument;
            const names = new Set(extract_names(assignee));
            this.replace(invalidate(renderer, scope, node2, names, execution_context === null));
          }
        }
      });
      component.rewrite_props(({ name: name3, reassigned, export_name }) => {
        const value = `$${name3}`;
        const i = renderer.context_lookup.get(`$${name3}`).index;
        const insert = reassigned || export_name ? b`${`$$subscribe_${name3}`}()` : b`@component_subscribe($$self, ${name3}, #value => $$invalidate(${i}, ${value} = #value))`;
        if (component.compile_options.dev) {
          return b`@validate_store(${name3}, '${name3}'); ${insert}`;
        }
        return insert;
      });
    }
    const args = [x`$$self`];
    const has_invalidate = props.length > 0 || component.has_reactive_assignments || component.slots.size > 0 || capture_state || inject_state;
    if (has_invalidate) {
      args.push(x`$$props`, x`$$invalidate`);
    } else if (component.compile_options.dev) {
      args.push(x`$$props`);
    }
    const has_create_fragment = component.compile_options.dev || block.has_content();
    if (has_create_fragment) {
      body.push(b`
			function create_fragment(#ctx) {
				${block.get_contents()}
			}
		`);
    }
    body.push(b`
		${component.extract_javascript(component.ast.module)}

		${component.fully_hoisted}
	`);
    const filtered_props = props.filter((prop) => {
      const variable = component.var_lookup.get(prop.name);
      if (variable.hoistable)
        return false;
      return prop.name[0] !== "$";
    });
    const reactive_stores = component.vars.filter((variable) => variable.name[0] === "$" && variable.name[1] !== "$");
    const instance_javascript = component.extract_javascript(component.ast.instance);
    const has_definition = component.compile_options.dev || instance_javascript && instance_javascript.length > 0 || filtered_props.length > 0 || uses_props || component.partly_hoisted.length > 0 || renderer.initial_context.length > 0 || component.reactive_declarations.length > 0 || capture_state || inject_state;
    const definition = has_definition ? component.alias("instance") : { type: "Literal", value: null };
    const reactive_store_subscriptions = reactive_stores.filter((store) => {
      const variable = component.var_lookup.get(store.name.slice(1));
      return !variable || variable.hoistable;
    }).map(({ name: name3 }) => b`
			${component.compile_options.dev && b`@validate_store(${name3.slice(1)}, '${name3.slice(1)}');`}
			@component_subscribe($$self, ${name3.slice(1)}, $$value => $$invalidate(${renderer.context_lookup.get(name3).index}, ${name3} = $$value));
		`);
    const resubscribable_reactive_store_unsubscribers = reactive_stores.filter((store) => {
      const variable = component.var_lookup.get(store.name.slice(1));
      return variable && (variable.reassigned || variable.export_name);
    }).map(({ name: name3 }) => b`$$self.$$.on_destroy.push(() => ${`$$unsubscribe_${name3.slice(1)}`}());`);
    if (has_definition) {
      const reactive_declarations = [];
      const fixed_reactive_declarations = [];
      component.reactive_declarations.forEach((d2) => {
        const dependencies = Array.from(d2.dependencies);
        const uses_rest_or_props = !!dependencies.find((n2) => n2 === "$$props" || n2 === "$$restProps");
        const writable = dependencies.filter((n2) => {
          const variable = component.var_lookup.get(n2);
          return variable && (variable.export_name || variable.mutated || variable.reassigned);
        });
        const condition = !uses_rest_or_props && writable.length > 0 && renderer.dirty(writable, true);
        let statement = d2.node;
        if (condition)
          statement = b`if (${condition}) { ${statement} }`[0];
        if (condition || uses_rest_or_props) {
          reactive_declarations.push(statement);
        } else {
          fixed_reactive_declarations.push(statement);
        }
      });
      const injected = Array.from(component.injected_reactive_declaration_vars).filter((name3) => {
        const variable = component.var_lookup.get(name3);
        return variable.injected && variable.name[0] !== "$";
      });
      const reactive_store_declarations = reactive_stores.map((variable) => {
        const $name = variable.name;
        const name3 = $name.slice(1);
        const store = component.var_lookup.get(name3);
        if (store && (store.reassigned || store.export_name)) {
          const unsubscribe = `$$unsubscribe_${name3}`;
          const subscribe = `$$subscribe_${name3}`;
          const i = renderer.context_lookup.get($name).index;
          return b`let ${$name}, ${unsubscribe} = @noop, ${subscribe} = () => (${unsubscribe}(), ${unsubscribe} = @subscribe(${name3}, $$value => $$invalidate(${i}, ${$name} = $$value)), ${name3})`;
        }
        return b`let ${$name};`;
      });
      let unknown_props_check;
      if (component.compile_options.dev && !(uses_props || uses_rest)) {
        unknown_props_check = b`
				const writable_props = [${writable_props.map((prop) => x`'${prop.export_name}'`)}];
				@_Object.keys($$props).forEach(key => {
					if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') @_console.warn(\`<${component.tag}> was created with unknown prop '\${key}'\`);
				});
			`;
      }
      const return_value = {
        type: "ArrayExpression",
        elements: renderer.initial_context.map((member) => ({
          type: "Identifier",
          name: member.name
        }))
      };
      body.push(b`
			function ${definition}(${args}) {
				${injected.map((name3) => b`let ${name3};`)}

				${rest}

				${reactive_store_declarations}

				${reactive_store_subscriptions}

				${resubscribable_reactive_store_unsubscribers}

				${component.slots.size || component.compile_options.dev || uses_slots ? b`let { $$slots: #slots = {}, $$scope } = $$props;` : null}
				${component.compile_options.dev && b`@validate_slots('${component.tag}', #slots, [${[...component.slots.keys()].map((key) => `'${key}'`).join(",")}]);`}
				${compute_slots}

				${instance_javascript}

				${missing_props_check}
				${unknown_props_check}

				${renderer.binding_groups.size > 0 && b`const $$binding_groups = [${[...renderer.binding_groups.keys()].map((_2) => x`[]`)}];`}

				${component.partly_hoisted}

				${set && b`$$self.$$set = ${set};`}

				${capture_state && b`$$self.$capture_state = ${capture_state};`}

				${inject_state && b`$$self.$inject_state = ${inject_state};`}

				${/* before reactive declarations */
      props_inject}

				${reactive_declarations.length > 0 && b`
				$$self.$$.update = () => {
					${reactive_declarations}
				};
				`}

				${fixed_reactive_declarations}

				${uses_props && b`$$props = @exclude_internal_props($$props);`}

				return ${return_value};
			}
		`);
    }
    const prop_indexes = x`{
		${props.filter((v2) => v2.export_name && !v2.module).map((v2) => p`${v2.export_name}: ${renderer.context_lookup.get(v2.name).index}`)}
	}`;
    let dirty;
    if (renderer.context_overflow) {
      dirty = x`[]`;
      for (let i = 0; i < renderer.context.length; i += 31) {
        dirty.elements.push(x`-1`);
      }
    }
    if (options.customElement) {
      let init_props = x`@attribute_to_object(this.attributes)`;
      if (uses_slots) {
        init_props = x`{ ...${init_props}, $$slots: @get_custom_elements_slots(this) }`;
      }
      const declaration = b`
			class ${name2} extends @SvelteElement {
				constructor(options) {
					super();

					${css.code && b`
						const style = document.createElement('style');
						style.textContent = \`${css.code.replace(regex_backslashes, "\\\\")}${css_sourcemap_enabled && options.dev ? `
/*# sourceMappingURL=${css.map.toUrl()} */` : ""}\`
						this.shadowRoot.appendChild(style)`}

					@init(this, { target: this.shadowRoot, props: ${init_props}, customElement: true }, ${definition}, ${has_create_fragment ? "create_fragment" : "null"}, ${not_equal}, ${prop_indexes}, null, ${dirty});

					if (options) {
						if (options.target) {
							@insert(options.target, this, options.anchor);
						}

						${(props.length > 0 || uses_props || uses_rest) && b`
						if (options.props) {
							this.$set(options.props);
							@flush();
						}`}
					}
				}
			}
		`[0];
      if (props.length > 0) {
        declaration.body.body.push({
          type: "MethodDefinition",
          kind: "get",
          static: true,
          computed: false,
          key: { type: "Identifier", name: "observedAttributes" },
          value: x`function() {
					return [${props.map((prop) => x`"${prop.export_name}"`)}];
				}`
        });
      }
      push_array$1(declaration.body.body, accessors);
      body.push(declaration);
      if (component.tag != null) {
        body.push(b`
				@_customElements.define("${component.tag}", ${name2});
			`);
      }
    } else {
      const superclass = {
        type: "Identifier",
        name: options.dev ? "@SvelteComponentDev" : "@SvelteComponent"
      };
      const optional_parameters = [];
      if (should_add_css) {
        optional_parameters.push(add_css);
      } else if (dirty) {
        optional_parameters.push(x`null`);
      }
      if (dirty) {
        optional_parameters.push(dirty);
      }
      const declaration = b`
			class ${name2} extends ${superclass} {
				constructor(options) {
					super(${options.dev && "options"});
					@init(this, options, ${definition}, ${has_create_fragment ? "create_fragment" : "null"}, ${not_equal}, ${prop_indexes}, ${optional_parameters});
					${options.dev && b`@dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "${name2.name}", options, id: create_fragment.name });`}
				}
			}
		`[0];
      push_array$1(declaration.body.body, accessors);
      body.push(declaration);
    }
    return { js: flatten(body), css };
  }