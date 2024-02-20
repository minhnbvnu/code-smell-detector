function decode_character_references(html2, is_attribute_value) {
    const entity_pattern = is_attribute_value ? entity_pattern_attr_value : entity_pattern_content;
    return html2.replace(entity_pattern, (match, entity) => {
      let code;
      if (entity[0] !== "#") {
        code = entities[entity];
      } else if (entity[1] === "x") {
        code = parseInt(entity.substring(2), 16);
      } else {
        code = parseInt(entity.substring(1), 10);
      }
      if (!code) {
        return match;
      }
      return String.fromCodePoint(validate_code(code));
    });
  }