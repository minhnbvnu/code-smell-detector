function normalizeLeftIndexConstraint(leftIndex, indexes, op) {
    if (leftIndex === indexes[1]) {
        op = inversions[op];
    }
    return op;
}