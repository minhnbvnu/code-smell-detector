function SlotTemplate$1(node2, renderer, options) {
    const parent_inline_component = node2.parent;
    const children = remove_whitespace_children(node2 instanceof SlotTemplate ? node2.children : [node2], node2.next);
    renderer.push();
    renderer.render(children, options);
    const lets = node2.lets;
    const seen = new Set(lets.map((l) => l.name.name));
    parent_inline_component.lets.forEach((l) => {
      if (!seen.has(l.name.name))
        lets.push(l);
    });
    const slot_fragment_content = renderer.pop();
    if (!is_empty_template_literal(slot_fragment_content)) {
      if (options.slot_scopes.has(node2.slot_template_name)) {
        if (node2.slot_template_name === "default") {
          throw new Error('Found elements without slot attribute when using slot="default"');
        }
        throw new Error(`Duplicate slot name "${node2.slot_template_name}" in <${parent_inline_component.name}>`);
      }
      options.slot_scopes.set(node2.slot_template_name, {
        input: get_slot_scope(node2.lets),
        output: slot_fragment_content,
        statements: get_const_tags$1(node2.const_tags)
      });
    }
  }