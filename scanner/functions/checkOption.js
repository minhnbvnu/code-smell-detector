function checkOption(name, t) {
    name = name.trim();

    if (/^[+-]W\d{3}$/g.test(name)) {
      return true;
    }

    if (options.validNames.indexOf(name) === -1) {
      if (t.type !== "jslint" && !_.has(options.removed, name)) {
        error("E001", t, name);
        return false;
      }
    }

    return true;
  }