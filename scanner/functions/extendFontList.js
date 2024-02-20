function extendFontList(a, b) {
  var index = {};
  forEach(a, function(o, i) {
    index[o.aifont] = i;
  });
  forEach(b, function(o) {
    if (o.aifont && o.aifont in index) {
      a[index[o.aifont]] = o; // replace
    } else {
      a.push(o); // add
    }
  });
}