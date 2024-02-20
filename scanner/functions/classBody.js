function classBody(type, value) {
    if (type == "variable" || cx.style == "keyword") {
      if ((value == "async" || value == "static" || value == "get" || value == "set" ||
           (isTS && (value == "public" || value == "private" || value == "protected" || value == "readonly" || value == "abstract"))) &&
          cx.stream.match(/^\s+[\w$\xa1-\uffff]/, false)) {
        cx.marked = "keyword";
        return cont(classBody);
      }
      cx.marked = "property";
      return cont(isTS ? classfield : functiondef, classBody);
    }
    if (value == "*") {
      cx.marked = "keyword";
      return cont(classBody);
    }
    if (type == ";") { return cont(classBody); }
    if (type == "}") { return cont(); }
  }