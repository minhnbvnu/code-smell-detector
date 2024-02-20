function tokenForPart(part, locale, formatOpts) {
    var type = part.type,
        value = part.value;

    if (type === "literal") {
      return {
        literal: true,
        val: value
      };
    }

    var style = formatOpts[type];
    var val = partTypeStyleToTokenVal[type];

    if (typeof val === "object") {
      val = val[style];
    }

    if (val) {
      return {
        literal: false,
        val: val
      };
    }

    return undefined;
  }