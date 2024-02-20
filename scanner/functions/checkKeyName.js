function checkKeyName(node2, name2) {
    var computed = node2.computed;
    var key = node2.key;
    return !computed && (key.type === "Identifier" && key.name === name2 || key.type === "Literal" && key.value === name2);
  }