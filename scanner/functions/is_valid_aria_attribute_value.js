function is_valid_aria_attribute_value(schema, value) {
    switch (schema.type) {
      case "boolean":
        return typeof value === "boolean";
      case "string":
      case "id":
        return typeof value === "string";
      case "tristate":
        return typeof value === "boolean" || value === "mixed";
      case "integer":
      case "number":
        return typeof value !== "boolean" && isNaN(Number(value)) === false;
      case "token":
        return (schema.values || []).indexOf(typeof value === "string" ? value.toLowerCase() : value) > -1;
      case "idlist":
        return typeof value === "string" && value.split(regex_any_repeated_whitespaces).every((id2) => typeof id2 === "string");
      case "tokenlist":
        return typeof value === "string" && value.split(regex_any_repeated_whitespaces).every((token) => (schema.values || []).indexOf(token.toLowerCase()) > -1);
      default:
        return false;
    }
  }