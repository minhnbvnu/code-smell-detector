function joinAttrs (assignments, boundTemplateHelper) {
    if (!assignments || !assignments.length) return "{}";

    var str = "Object.assign(";
    var insideLiteral = false;
    var matches = null;

    for (var i = 0, n = assignments.length; i < n; i++) {
      var it = assignments[i];
      if (typeof it === 'string') {
        if (insideLiteral) {
          str += " },";
          insideLiteral = false;
        }
        str += it;
        if (i < n - 1) str += ", "
      } else {
        if (!insideLiteral) {
          str += "{ ";
          insideLiteral = true;
        }
        matches = it[1].match(/__\$props__\[\d*\]/g);
        if (matches === null) {
          str += "'" + it[0] + "':'" + it[1] + "',";
        } else {
          str += "'" + it[0] + "':'" + it[1].replace(/__\$props__\[(\d+)\]/g, "'+__$props__[$1]+'") + "',";
          if (boundTemplateHelper) boundTemplateHelper(it[0], it[1]);
        }
      }
    }

    return str + (insideLiteral ? " })" : ")");
  }