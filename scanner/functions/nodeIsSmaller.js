function nodeIsSmaller(left, right) {
  if (!left) return false;
  if (!right) return true;
  return left.endIndex - left.startIndex < right.endIndex - right.startIndex;
}