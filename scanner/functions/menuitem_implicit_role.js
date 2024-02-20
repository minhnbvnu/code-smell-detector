function menuitem_implicit_role(attribute_map) {
    const type_attribute = attribute_map.get("type");
    if (!type_attribute || !type_attribute.is_static)
      return;
    const type = type_attribute.get_static_value();
    return menuitem_type_to_implicit_role.get(type);
  }