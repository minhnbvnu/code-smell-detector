function nodeHasParent(current, possibleParent) {
  if (current === possibleParent) {
    return true;
  }
  while (current.parentNode) {
    if (current === possibleParent) {
      return true;
    }
    current = current.parentNode;
  }
  return false;
}