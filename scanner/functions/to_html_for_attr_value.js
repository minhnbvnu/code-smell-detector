function to_html_for_attr_value(attr, block, literal2, state) {
    attr.node.chunks.forEach((chunk) => {
      if (chunk.type === "Text") {
        state.quasi.value.raw += escape_html(chunk.data);
      } else {
        literal2.quasis.push(state.quasi);
        literal2.expressions.push(chunk.manipulate(block));
        state.quasi = {
          type: "TemplateElement",
          value: { raw: "" }
        };
      }
    });
  }