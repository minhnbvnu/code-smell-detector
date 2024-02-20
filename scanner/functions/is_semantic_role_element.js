function is_semantic_role_element(role, tag_name, attribute_map) {
    for (const [schema, ax_object] of lib_1$1.entries()) {
      if (schema.name === tag_name && (!schema.attributes || schema.attributes.every((attr) => attribute_map.has(attr.name) && attribute_map.get(attr.name).get_static_value() === attr.value))) {
        for (const name2 of ax_object) {
          const roles = lib_3$1.get(name2);
          if (roles) {
            for (const { name: name3 } of roles) {
              if (name3 === role) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }