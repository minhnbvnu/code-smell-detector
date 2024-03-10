    wrappers2.forEach((wrapper) => {
      if (wrapper instanceof TextWrapper) {
        if (wrapper.use_space())
          state.quasi.value.raw += " ";
        const parent = wrapper.node.parent;
        const raw = parent && (parent.name === "script" || parent.name === "style" || can_use_raw_text);
        state.quasi.value.raw += (raw ? wrapper.data : escape_html(wrapper.data)).replace(regex_backslashes, "\\\\").replace(regex_backticks, "\\`").replace(regex_dollar_signs, "\\$");
      } else if (wrapper instanceof MustacheTagWrapper || wrapper instanceof RawMustacheTagWrapper) {
        literal2.quasis.push(state.quasi);
        literal2.expressions.push(wrapper.node.expression.manipulate(block));
        state.quasi = {
          type: "TemplateElement",
          value: { raw: "" }
        };
      } else if (wrapper.node.name === "noscript")
        ;
      else {
        const nodeName = wrapper.node.name;
        state.quasi.value.raw += `<${nodeName}`;
        const is_empty_textarea = nodeName === "textarea" && wrapper.fragment.nodes.length === 0;
        wrapper.attributes.forEach((attr) => {
          if (is_empty_textarea && attr.node.name === "value") {
            return;
          }
          state.quasi.value.raw += ` ${fix_attribute_casing(attr.node.name)}="`;
          to_html_for_attr_value(attr, block, literal2, state);
          state.quasi.value.raw += '"';
        });
        if (!wrapper.void) {
          state.quasi.value.raw += ">";
          if (nodeName === "pre") {
            const first = wrapper.fragment.nodes[0];
            if (first && first.node.type === "Text" && regex_starts_with_newline.test(first.node.data)) {
              state.quasi.value.raw += "\n";
            }
          }
          if (is_empty_textarea) {
            const value_attribute = wrapper.attributes.find((attr) => attr.node.name === "value");
            if (value_attribute) {
              const first = value_attribute.node.chunks[0];
              if (first && first.type === "Text" && regex_starts_with_newline.test(first.data)) {
                state.quasi.value.raw += "\n";
              }
              to_html_for_attr_value(value_attribute, block, literal2, state);
            }
          }
          to_html(wrapper.fragment.nodes, block, literal2, state);
          state.quasi.value.raw += `</${nodeName}>`;
        } else {
          state.quasi.value.raw += "/>";
        }
      }
    });