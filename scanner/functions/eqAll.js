function eqAll(val) {
    var end = arguments.length, msg = null;
    if (typeof arguments[end-1] == "string")
      msg = arguments[--end];
    if (i == end) throw new Error("No editors provided to eqAll");
    for (var i = 1; i < end; ++i)
      eq(arguments[i].getValue(), val, msg)
  }