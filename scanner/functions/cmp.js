function cmp(a, b) {
    if (a === b) { return true; }
    if (!a || typeof a != "object" || !b || typeof b != "object") { return false; }
    var props = 0;
    for (var prop in a) { if (a.hasOwnProperty(prop)) {
      if (!b.hasOwnProperty(prop) || !cmp(a[prop], b[prop])) { return false; }
      props++;
    } }
    for (var prop in b) { if (b.hasOwnProperty(prop)) { props--; } }
    return props == 0;
  }