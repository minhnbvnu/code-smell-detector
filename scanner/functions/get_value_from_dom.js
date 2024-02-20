function get_value_from_dom(_renderer, element, binding, contextual_dependencies) {
    const { node: node2 } = element;
    const { name: name2 } = binding.node;
    if (name2 === "this") {
      return x`$$value`;
    }
    if (regex_box_size.test(name2)) {
      return x`@ResizeObserverSingleton.entries.get(this)?.${name2}`;
    }
    if (node2.name === "select") {
      return node2.get_static_attribute_value("multiple") === true ? x`@select_multiple_value(this)` : x`@select_value(this)`;
    }
    const type = node2.get_static_attribute_value("type");
    if (name2 === "group") {
      if (type === "checkbox") {
        const { binding_group, contexts } = binding.binding_group;
        add_to_set(contextual_dependencies, contexts);
        return x`@get_binding_group_value(${binding_group()}, this.__value, this.checked)`;
      }
      return x`this.__value`;
    }
    if (type === "range" || type === "number") {
      return x`@to_number(this.${name2})`;
    }
    if (name2 === "buffered" || name2 === "seekable" || name2 === "played") {
      return x`@time_ranges_to_array(this.${name2})`;
    }
    return x`this.${name2}`;
  }