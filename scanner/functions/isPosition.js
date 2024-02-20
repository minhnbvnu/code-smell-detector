function isPosition(val) {
    return typeof val == "number" || typeof val == "object" && typeof val.line == "number" && typeof val.ch == "number";
  }