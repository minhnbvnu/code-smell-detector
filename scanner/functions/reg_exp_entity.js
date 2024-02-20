function reg_exp_entity(entity_name, is_attribute_value) {
    if (is_attribute_value && !entity_name.endsWith(";")) {
      return `${entity_name}\\b(?!=)`;
    }
    return entity_name;
  }