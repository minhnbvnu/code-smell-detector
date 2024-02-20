function nested_sum(num) {
  var n = 0;
  for (i = 1; i <= num; i++) {
    n += sum(1, i);
  }
  return n;
}