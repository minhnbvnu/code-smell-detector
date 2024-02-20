function get_implicit_role(name2, attribute_map) {
    if (name2 === "menuitem") {
      return menuitem_implicit_role(attribute_map);
    } else if (name2 === "input") {
      return input_implicit_role(attribute_map);
    } else {
      return a11y_implicit_semantics.get(name2);
    }
  }