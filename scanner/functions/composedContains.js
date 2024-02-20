function composedContains(reference, test) {
  let current = test;

  while (current !== null) {
    if (current === reference) {
      return true;
    }

    current = composedParent(current);
  }

  return false;
}