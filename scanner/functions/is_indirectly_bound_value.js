function is_indirectly_bound_value(attribute) {
    const element = attribute.parent;
    return attribute.name === "value" && (element.node.name === "option" || // TODO check it's actually bound
    element.node.name === "input" && element.node.bindings.some((binding) => regex_contains_checked_or_group.test(binding.name)));
  }