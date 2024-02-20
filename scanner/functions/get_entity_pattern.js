function get_entity_pattern(is_attribute_value) {
    const reg_exp_num = "#(?:x[a-fA-F\\d]+|\\d+)(?:;)?";
    const reg_exp_entities = Object.keys(entities).map((entity_name) => reg_exp_entity(entity_name, is_attribute_value));
    const entity_pattern = new RegExp(`&(${reg_exp_num}|${reg_exp_entities.join("|")})`, "g");
    return entity_pattern;
  }