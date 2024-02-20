function firstBy(f1, f2) {
  var compare = f2 ? function(a, b) {return f1(a, b) || f2(a, b);} : f1;
  compare.thenBy = function(f) {return firstBy(compare, f);};
  return compare;
}