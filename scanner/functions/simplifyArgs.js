function simplifyArgs(args) {
    if (typeof args === "string") {
      var MAX_STRING_LENGTH = 75;
      return args.length <= MAX_STRING_LENGTH
        ? args
        : args.substring(0, MAX_STRING_LENGTH) + "...";
    }
    if (typeof args !== "object" || args === null) {
      return args;
    }
    if ("length" in args) {
      // array
      var simpleArgs = [],
        i,
        ii;
      var MAX_ITEMS = 10;
      for (i = 0, ii = Math.min(MAX_ITEMS, args.length); i < ii; i++) {
        simpleArgs.push(simplifyArgs(args[i]));
      }
      if (i < args.length) {
        simpleArgs.push("...");
      }
      return simpleArgs;
    }
    var simpleObj = {};
    for (var key in args) {
      simpleObj[key] = simplifyArgs(args[key]);
    }
    return simpleObj;
  }