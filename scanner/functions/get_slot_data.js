function get_slot_data(values, block = null) {
    return {
      type: "ObjectExpression",
      properties: Array.from(values.values()).filter((attribute) => attribute.name !== "name").map((attribute) => {
        if (attribute.is_spread) {
          const argument = get_spread_value(block, attribute);
          return {
            type: "SpreadElement",
            argument
          };
        }
        const value = get_value(block, attribute);
        return p`${attribute.name}: ${value}`;
      })
    };
  }