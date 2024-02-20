function visitParentToIndex(other, subA) {
  other.forEach((counter, subB) => indexSimilarity(subA, subB, counter));
}