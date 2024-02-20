function asToken(val) {
    if (!val) { return null; }
    if (typeof val == "string") { return val.replace(/\./g, " "); }
    var result = [];
    for (var i = 0; i < val.length; i++)
      { result.push(val[i] && val[i].replace(/\./g, " ")); }
    return result;
  }