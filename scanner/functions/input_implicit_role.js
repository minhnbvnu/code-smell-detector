function input_implicit_role(attribute_map) {
    const type_attribute = attribute_map.get("type");
    if (!type_attribute || !type_attribute.is_static)
      return;
    const type = type_attribute.get_static_value();
    const list_attribute_exists = attribute_map.has("list");
    if (list_attribute_exists && combobox_if_list.has(type)) {
      return "combobox";
    }
    return input_type_to_implicit_role.get(type);
  }