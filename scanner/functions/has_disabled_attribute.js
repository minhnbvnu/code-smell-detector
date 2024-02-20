function has_disabled_attribute(attribute_map) {
    const disabled_attr = attribute_map.get("disabled");
    const disabled_attr_value = disabled_attr && disabled_attr.get_static_value();
    if (disabled_attr_value) {
      return true;
    }
    const aria_disabled_attr = attribute_map.get("aria-disabled");
    if (aria_disabled_attr) {
      const aria_disabled_attr_value = aria_disabled_attr.get_static_value();
      if (aria_disabled_attr_value === true) {
        return true;
      }
    }
    return false;
  }