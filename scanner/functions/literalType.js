function literalType(node) {
    if (node.regex) return getInstance(cx.protos.RegExp);

    switch (typeof node.value) {
      case "boolean":
        return cx.bool;

      case "number":
        return cx.num;

      case "string":
        return cx.str;

      case "object":
      case "function":
        if (!node.value) return ANull;
        return getInstance(cx.protos.RegExp);
    }
  }