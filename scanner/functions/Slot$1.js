function Slot$1(node2, renderer, options) {
    const slot_data = get_slot_data(node2.values);
    const slot = node2.get_static_attribute_value("slot");
    const nearest_inline_component = node2.find_nearest(/InlineComponent/);
    if (slot && nearest_inline_component) {
      renderer.push();
    }
    renderer.push();
    renderer.render(node2.children, options);
    const result = renderer.pop();
    renderer.add_expression(x`
		#slots.${node2.slot_name}
			? #slots.${node2.slot_name}(${slot_data})
			: ${result}
	`);
    if (slot && nearest_inline_component) {
      const lets = node2.lets;
      const seen = new Set(lets.map((l) => l.name.name));
      nearest_inline_component.lets.forEach((l) => {
        if (!seen.has(l.name.name))
          lets.push(l);
      });
      options.slot_scopes.set(slot, {
        input: get_slot_scope(node2.lets),
        output: renderer.pop()
      });
    }
  }