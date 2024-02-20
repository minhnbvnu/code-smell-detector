function quasi(type, value) {
    if (type != "quasi") { return pass(); }
    if (value.slice(value.length - 2) != "${") { return cont(quasi); }
    return cont(expression, continueQuasi);
  }