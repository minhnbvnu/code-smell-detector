function afterImport(type) {
    if (type == "string") { return cont(); }
    return pass(importSpec, maybeMoreImports, maybeFrom);
  }