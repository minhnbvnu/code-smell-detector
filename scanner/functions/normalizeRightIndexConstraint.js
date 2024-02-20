function normalizeRightIndexConstraint(rightIndex, indexes, op) {
    if (rightIndex === indexes[1]) {
        op = inversions[op];
    }
    return op;
}