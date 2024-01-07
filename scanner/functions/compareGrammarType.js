function compareGrammarType(a, b) {
  if (isTreeSitter(a)) {
    return -1;
  } else if (isTreeSitter(b)) {
    return 1;
  }
  return 0;
}