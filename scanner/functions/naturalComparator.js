function naturalComparator(a, b) {
  if (a === b) {
    return 0;
  } else if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
}