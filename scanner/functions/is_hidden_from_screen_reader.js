function is_hidden_from_screen_reader(tag_name, attribute_map) {
    var _a2;
    if (tag_name === "input") {
      const type = (_a2 = attribute_map.get("type")) === null || _a2 === void 0 ? void 0 : _a2.get_static_value();
      if (type && type === "hidden") {
        return true;
      }
    }
    const aria_hidden = attribute_map.get("aria-hidden");
    if (!aria_hidden)
      return false;
    if (!aria_hidden.is_static)
      return true;
    const aria_hidden_value = aria_hidden.get_static_value();
    return aria_hidden_value === true || aria_hidden_value === "true";
  }