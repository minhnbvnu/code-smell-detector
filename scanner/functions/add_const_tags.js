function add_const_tags(block, const_tags, ctx) {
    const const_tags_props = [];
    const_tags.forEach((const_tag, i) => {
      const name2 = `#constants_${i}`;
      const_tags_props.push(b`const ${name2} = ${const_tag.expression.manipulate(block, ctx)}`);
      const to_ctx = (name3) => block.renderer.context_lookup.has(name3) ? x`${ctx}[${block.renderer.context_lookup.get(name3).index}]` : { type: "Identifier", name: name3 };
      const_tag.contexts.forEach((context) => {
        if (context.type === "DestructuredVariable") {
          const_tags_props.push(b`${ctx}[${block.renderer.context_lookup.get(context.key.name).index}] = ${context.default_modifier(context.modifier({ type: "Identifier", name: name2 }), to_ctx)}`);
        } else {
          const expression = new Expression(block.renderer.component, const_tag, const_tag.scope, context.key);
          const_tags_props.push(b`const ${context.property_name} = ${expression.manipulate(block, ctx)}`);
        }
      });
    });
    return const_tags_props;
  }