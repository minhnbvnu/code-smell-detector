function nodes_to_template_literal(value) {
    const literal2 = {
      type: "TemplateLiteral",
      expressions: [],
      quasis: []
    };
    let quasi = {
      type: "TemplateElement",
      value: { raw: "", cooked: null },
      tail: false
    };
    value.forEach((node2) => {
      if (node2.type === "Text") {
        quasi.value.raw += node2.raw;
      } else if (node2.type === "MustacheTag") {
        literal2.quasis.push(quasi);
        literal2.expressions.push(node2.expression);
        quasi = {
          type: "TemplateElement",
          value: { raw: "", cooked: null },
          tail: false
        };
      }
    });
    quasi.tail = true;
    literal2.quasis.push(quasi);
    return literal2;
  }