function afterExport(type, value) {
    if (value == "*") { cx.marked = "keyword"; return cont(maybeFrom, expect(";")); }
    if (value == "default") { cx.marked = "keyword"; return cont(expression, expect(";")); }
    if (type == "{") { return cont(commasep(exportField, "}"), maybeFrom, expect(";")); }
    return pass(statement);
  }