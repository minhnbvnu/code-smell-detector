function binopIsBoolean(op) {
    switch (op) {
      case "==":
      case "!=":
      case "===":
      case "!==":
      case "<":
      case ">":
      case ">=":
      case "<=":
      case "in":
      case "instanceof":
        return true;
    }
  }