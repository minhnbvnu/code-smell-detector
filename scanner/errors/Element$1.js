function Element$1(node2, renderer, options) {
    const children = remove_whitespace_children(node2.children, node2.next);
    let node_contents;
    const contenteditable = is_contenteditable(node2);
    if (node2.is_dynamic_element) {
      renderer.push();
    }
    renderer.add_string("<");
    add_tag_name();
    const class_expression_list = node2.classes.map((class_directive) => {
      const { expression, name: name2 } = class_directive;
      const snippet = expression ? expression.node : x`#ctx.${name2}`;
      return x`${snippet} ? "${name2}" : ""`;
    });
    if (node2.needs_manual_style_scoping) {
      class_expression_list.push(x`"${node2.component.stylesheet.id}"`);
    }
    const class_expression = class_expression_list.length > 0 && class_expression_list.reduce((lhs, rhs) => x`${lhs} + ' ' + ${rhs}`);
    const style_expression_list = node2.styles.map((style_directive) => {
      let { name: name2, important, expression: { node: expression } } = style_directive;
      if (important) {
        expression = x`${expression} + ' !important'`;
      }
      return p`"${name2}": ${expression}`;
    });
    const style_expression = style_expression_list.length > 0 && x`{ ${style_expression_list} }`;
    if (node2.attributes.some((attr) => attr.is_spread)) {
      const args = [];
      node2.attributes.forEach((attribute) => {
        if (attribute.is_spread) {
          args.push(x`@escape_object(${attribute.expression.node})`);
        } else {
          const attr_name = node2.namespace === namespaces.foreign ? attribute.name : fix_attribute_casing(attribute.name);
          const name2 = attribute.name.toLowerCase();
          if (name2 === "value" && node2.name.toLowerCase() === "textarea") {
            node_contents = get_attribute_value(attribute);
          } else if (attribute.is_true) {
            args.push(x`{ ${attr_name}: true }`);
          } else if (boolean_attributes.has(name2) && attribute.chunks.length === 1 && attribute.chunks[0].type !== "Text") {
            args.push(x`{ ${attr_name}: ${attribute.chunks[0].node} || null }`);
          } else if (attribute.chunks.length === 1 && attribute.chunks[0].type !== "Text") {
            const snippet = attribute.chunks[0].node;
            args.push(x`{ ${attr_name}: @escape_attribute_value(${snippet}) }`);
          } else {
            args.push(x`{ ${attr_name}: ${get_attribute_value(attribute)} }`);
          }
        }
      });
      renderer.add_expression(x`@spread([${args}], { classes: ${class_expression}, styles: ${style_expression} })`);
    } else {
      let add_class_attribute = !!class_expression;
      let add_style_attribute = !!style_expression;
      node2.attributes.forEach((attribute) => {
        const name2 = attribute.name.toLowerCase();
        const attr_name = node2.namespace === namespaces.foreign ? attribute.name : fix_attribute_casing(attribute.name);
        if (name2 === "value" && node2.name.toLowerCase() === "textarea") {
          node_contents = get_attribute_value(attribute);
        } else if (attribute.is_true) {
          renderer.add_string(` ${attr_name}`);
        } else if (boolean_attributes.has(name2) && attribute.chunks.length === 1 && attribute.chunks[0].type !== "Text") {
          renderer.add_string(" ");
          renderer.add_expression(x`${attribute.chunks[0].node} ? "${attr_name}" : ""`);
        } else if (name2 === "class" && class_expression) {
          add_class_attribute = false;
          renderer.add_string(` ${attr_name}="`);
          renderer.add_expression(x`[${get_class_attribute_value(attribute)}, ${class_expression}].join(' ').trim()`);
          renderer.add_string('"');
        } else if (name2 === "style" && style_expression) {
          add_style_attribute = false;
          renderer.add_expression(x`@add_styles(@merge_ssr_styles(${get_attribute_value(attribute)}, ${style_expression}))`);
        } else if (attribute.chunks.length === 1 && attribute.chunks[0].type !== "Text") {
          const snippet = attribute.chunks[0].node;
          renderer.add_expression(x`@add_attribute("${attr_name}", ${snippet}, ${boolean_attributes.has(name2) ? 1 : 0})`);
        } else {
          renderer.add_string(` ${attr_name}="`);
          renderer.add_expression((name2 === "class" ? get_class_attribute_value : get_attribute_value)(attribute));
          renderer.add_string('"');
        }
      });
      if (add_class_attribute) {
        renderer.add_expression(x`@add_classes((${class_expression}).trim())`);
      }
      if (add_style_attribute) {
        renderer.add_expression(x`@add_styles(${style_expression})`);
      }
    }
    node2.bindings.forEach((binding) => {
      const { name: name2, expression } = binding;
      if (binding.is_readonly) {
        return;
      }
      if (name2 === "group") {
        const value_attribute = node2.attributes.find(({ name: name3 }) => name3 === "value");
        if (value_attribute) {
          const value = get_attribute_expression(value_attribute);
          const type = node2.get_static_attribute_value("type");
          const bound2 = expression.node;
          const condition = type === "checkbox" ? x`~${bound2}.indexOf(${value})` : x`${value} === ${bound2}`;
          renderer.add_expression(x`${condition} ? @add_attribute("checked", true, 1) : ""`);
        }
      } else if (contenteditable && is_name_contenteditable(name2)) {
        node_contents = expression.node;
      } else if (binding.name === "value" && node2.name === "textarea") {
        const snippet = expression.node;
        node_contents = x`${snippet} || ""`;
      } else if (binding.name === "value" && node2.name === "select")
        ;
      else {
        const snippet = expression.node;
        renderer.add_expression(x`@add_attribute("${name2}", ${snippet}, ${boolean_attributes.has(name2) ? 1 : 0})`);
      }
    });
    renderer.add_string(">");
    if (node_contents !== void 0) {
      if (contenteditable) {
        renderer.push();
        renderer.render(children, options);
        const result = renderer.pop();
        renderer.add_expression(x`($$value => $$value === void 0 ? ${result} : $$value)(${node_contents})`);
      } else {
        if (node2.name === "textarea") {
          const value_attribute = node2.attributes.find(({ name: name2 }) => name2 === "value");
          if (value_attribute) {
            const first = value_attribute.chunks[0];
            if (first && first.type === "Text" && regex_starts_with_newline.test(first.data)) {
              renderer.add_string("\n");
            }
          }
        }
        renderer.add_expression(node_contents);
      }
      add_close_tag();
    } else {
      if (node2.name === "pre") {
        const first = children[0];
        if (first && first.type === "Text" && regex_starts_with_newline.test(first.data)) {
          renderer.add_string("\n");
        }
      }
      if (node2.is_dynamic_element)
        renderer.push();
      renderer.render(children, options);
      if (node2.is_dynamic_element) {
        const children2 = renderer.pop();
        renderer.add_expression(x`@is_void(#tag) ? '' : ${children2}`);
      }
      add_close_tag();
    }
    if (node2.is_dynamic_element) {
      let content = renderer.pop();
      if (options.dev && node2.children.length > 0)
        content = x`(() => { @validate_void_dynamic_element(#tag); return ${content}; })()`;
      renderer.add_expression(x`((#tag) => {
			${options.dev && x`@validate_dynamic_element(#tag)`}
			return #tag ? ${content} : '';
		})(${node2.tag_expr.node})`);
    }
    function add_close_tag() {
      if (node2.tag_expr.node.type === "Literal") {
        if (!is_void(node2.tag_expr.node.value)) {
          renderer.add_string("</");
          add_tag_name();
          renderer.add_string(">");
        }
        return;
      }
      renderer.add_expression(x`@is_void(#tag) ? '' : \`</\${#tag}>\``);
    }
    function add_tag_name() {
      if (node2.tag_expr.node.type === "Literal") {
        renderer.add_string(node2.tag_expr.node.value);
      } else {
        renderer.add_expression(node2.tag_expr.node);
      }
    }
  }