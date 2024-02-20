function unopResultType(op) {
    switch (op) {
      case "+":
      case "-":
      case "~":
        return cx.num;

      case "!":
        return cx.bool;

      case "typeof":
        return cx.str;

      case "void":
      case "delete":
        return ANull;
    }
  }