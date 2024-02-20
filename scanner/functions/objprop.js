function objprop(type, value) {
    if (type == "async") {
      cx.marked = "property";
      return cont(objprop);
    } else if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property";
      if (value == "get" || value == "set") { return cont(getterSetter); }
      return cont(afterprop);
    } else if (type == "number" || type == "string") {
      cx.marked = jsonldMode ? "property" : (cx.style + " property");
      return cont(afterprop);
    } else if (type == "jsonld-keyword") {
      return cont(afterprop);
    } else if (type == "modifier") {
      return cont(objprop)
    } else if (type == "[") {
      return cont(expression, expect("]"), afterprop);
    } else if (type == "spread") {
      return cont(expression);
    } else if (type == ":") {
      return pass(afterprop)
    }
  }