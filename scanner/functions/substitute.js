function substitute(rules) {
  return rules.map(function(r) {
    for (var key in r) {
      if (r[key] == "%") {
        r[key] = generators[key](r);
      }
    }
    return ICAL.Recur.fromData(r);
  });
}