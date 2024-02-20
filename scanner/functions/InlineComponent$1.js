function InlineComponent$1(node2, renderer, options) {
    const binding_props = [];
    const binding_fns = [];
    node2.bindings.forEach((binding) => {
      renderer.has_bindings = true;
      const snippet = binding.expression.node;
      binding_props.push(p`${binding.name}: ${snippet}`);
      binding_fns.push(p`${binding.name}: $$value => { ${snippet} = $$value; $$settled = false }`);
    });
    const uses_spread = node2.attributes.find((attr) => attr.is_spread);
    let props;
    if (uses_spread) {
      props = x`@_Object.assign({}, ${node2.attributes.map((attribute) => {
        if (attribute.is_spread) {
          return attribute.expression.node;
        } else {
          return x`{ ${attribute.name}: ${get_prop_value(attribute)} }`;
        }
      }).concat(binding_props.map((p2) => x`{ ${p2} }`))})`;
    } else {
      props = x`{
			${node2.attributes.map((attribute) => p`${attribute.name}: ${get_prop_value(attribute)}`)},
			${binding_props}
		}`;
    }
    const bindings = x`{
		${binding_fns}
	}`;
    const expression = node2.name === "svelte:self" ? renderer.name : node2.name === "svelte:component" ? x`(${node2.expression.node}) || @missing_component` : node2.name.split(".").reduce((lhs, rhs) => x`${lhs}.${rhs}`);
    const slot_fns = [];
    const children = node2.children;
    if (children.length) {
      const slot_scopes = /* @__PURE__ */ new Map();
      renderer.render(children, Object.assign({}, options, {
        slot_scopes
      }));
      slot_scopes.forEach(({ input, output, statements }, name2) => {
        slot_fns.push(p`${name2}: (${input}) => { ${statements}; return ${output}; }`);
      });
    }
    const slots = x`{
		${slot_fns}
	}`;
    if (node2.css_custom_properties.length > 0) {
      if (node2.namespace === namespaces.svg) {
        renderer.add_string('<g style="');
      } else {
        renderer.add_string('<div style="display: contents; ');
      }
      node2.css_custom_properties.forEach((attr, index) => {
        renderer.add_string(`${attr.name}:`);
        renderer.add_expression(get_attribute_value(attr));
        renderer.add_string(";");
        if (index < node2.css_custom_properties.length - 1)
          renderer.add_string(" ");
      });
      renderer.add_string('">');
    }
    renderer.add_expression(x`@validate_component(${expression}, "${node2.name}").$$render($$result, ${props}, ${bindings}, ${slots})`);
    if (node2.css_custom_properties.length > 0) {
      if (node2.namespace === namespaces.svg) {
        renderer.add_string("</g>");
      } else {
        renderer.add_string("</div>");
      }
    }
  }