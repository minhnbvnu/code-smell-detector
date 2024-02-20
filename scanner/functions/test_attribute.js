function test_attribute(operator, expected_value, case_insensitive, value) {
    if (case_insensitive) {
      expected_value = expected_value.toLowerCase();
      value = value.toLowerCase();
    }
    switch (operator) {
      case "=":
        return value === expected_value;
      case "~=":
        return value.split(/\s/).includes(expected_value);
      case "|=":
        return `${value}-`.startsWith(`${expected_value}-`);
      case "^=":
        return value.startsWith(expected_value);
      case "$=":
        return value.endsWith(expected_value);
      case "*=":
        return value.includes(expected_value);
      default:
        throw new Error("this shouldn't happen");
    }
  }