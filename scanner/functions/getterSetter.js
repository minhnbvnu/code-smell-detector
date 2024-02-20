function getterSetter(type) {
    if (type != "variable") { return pass(afterprop); }
    cx.marked = "property";
    return cont(functiondef);
  }