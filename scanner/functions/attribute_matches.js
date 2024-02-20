function attribute_matches(node2, name2, expected_value, operator, case_insensitive) {
    const spread = node2.attributes.find((attr2) => attr2.type === "Spread");
    if (spread)
      return true;
    if (node2.bindings.some((binding) => binding.name === name2))
      return true;
    const attr = node2.attributes.find((attr2) => attr2.name === name2);
    if (!attr)
      return false;
    if (attr.is_true)
      return operator === null;
    if (expected_value == null)
      return true;
    if (attr.chunks.length === 1) {
      const value = attr.chunks[0];
      if (!value)
        return false;
      if (value.type === "Text")
        return test_attribute(operator, expected_value, case_insensitive, value.data);
    }
    const possible_values = /* @__PURE__ */ new Set();
    let prev_values = [];
    for (const chunk of attr.chunks) {
      const current_possible_values = /* @__PURE__ */ new Set();
      if (chunk.type === "Text") {
        current_possible_values.add(chunk.data);
      } else {
        gather_possible_values(chunk.node, current_possible_values);
      }
      if (current_possible_values.has(UNKNOWN))
        return true;
      if (prev_values.length > 0) {
        const start_with_space = [];
        const remaining = [];
        current_possible_values.forEach((current_possible_value) => {
          if (regex_starts_with_whitespace.test(current_possible_value)) {
            start_with_space.push(current_possible_value);
          } else {
            remaining.push(current_possible_value);
          }
        });
        if (remaining.length > 0) {
          if (start_with_space.length > 0) {
            prev_values.forEach((prev_value) => possible_values.add(prev_value));
          }
          const combined = [];
          prev_values.forEach((prev_value) => {
            remaining.forEach((value) => {
              combined.push(prev_value + value);
            });
          });
          prev_values = combined;
          start_with_space.forEach((value) => {
            if (regex_ends_with_whitespace.test(value)) {
              possible_values.add(value);
            } else {
              prev_values.push(value);
            }
          });
          continue;
        } else {
          prev_values.forEach((prev_value) => possible_values.add(prev_value));
          prev_values = [];
        }
      }
      current_possible_values.forEach((current_possible_value) => {
        if (regex_ends_with_whitespace.test(current_possible_value)) {
          possible_values.add(current_possible_value);
        } else {
          prev_values.push(current_possible_value);
        }
      });
      if (prev_values.length < current_possible_values.size) {
        prev_values.push(" ");
      }
      if (prev_values.length > 20) {
        return true;
      }
    }
    prev_values.forEach((prev_value) => possible_values.add(prev_value));
    if (possible_values.has(UNKNOWN))
      return true;
    for (const value of possible_values) {
      if (test_attribute(operator, expected_value, case_insensitive, value))
        return true;
    }
    return false;
  }