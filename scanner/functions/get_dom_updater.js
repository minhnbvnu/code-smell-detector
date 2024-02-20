function get_dom_updater(element, binding, mounting) {
    const { node: node2 } = element;
    if (binding.is_readonly_media_attribute()) {
      return null;
    }
    if (binding.node.name === "this") {
      return null;
    }
    if (node2.name === "select") {
      return node2.get_static_attribute_value("multiple") === true ? b`@select_options(${element.var}, ${binding.snippet})` : mounting ? b`@select_option(${element.var}, ${binding.snippet}, true)` : b`@select_option(${element.var}, ${binding.snippet})`;
    }
    if (binding.node.name === "group") {
      const type = node2.get_static_attribute_value("type");
      const condition = type === "checkbox" ? x`~(${binding.snippet} || []).indexOf(${element.var}.__value)` : x`${element.var}.__value === ${binding.snippet}`;
      return b`${element.var}.checked = ${condition};`;
    }
    if (binding.node.name === "value") {
      return b`@set_input_value(${element.var}, ${binding.snippet});`;
    }
    return b`${element.var}.${binding.node.name} = ${binding.snippet};`;
  }