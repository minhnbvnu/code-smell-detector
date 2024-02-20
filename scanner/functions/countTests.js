function countTests() {
  if (!filters.length) return tests.length;
  var sum = 0;
  for (var i = 0; i < tests.length; ++i) {
    var name = tests[i].name;
    for (var j = 0; j < filters.length; j++) {
      if (name.match(filters[j])) {
        ++sum;
        break;
      }
    }
  }
  return sum;
}