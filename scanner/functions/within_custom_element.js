function within_custom_element(parent) {
    while (parent) {
      if (parent.type === "InlineComponent")
        return false;
      if (parent.type === "Element" && regex_minus_sign.test(parent.name))
        return true;
      parent = parent.parent;
    }
    return false;
  }