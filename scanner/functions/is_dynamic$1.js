function is_dynamic$1(value) {
    return value.length > 1 || value[0].type !== "Text";
  }