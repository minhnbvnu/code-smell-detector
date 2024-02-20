function getKnown(old) {
  var known = new Set();
  for (var type in old) {
    if (!old.hasOwnProperty(type)) continue;
    var group = old[type];
    for (var i = 0; i < group.length; i++) {
      var regex = group[i][0].source;
      known.add(regex);
    }
  }
  return known;
}