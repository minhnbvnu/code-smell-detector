function compareWithEpsilon(a, b, epsilon) {
    return a - epsilon < b && a + epsilon > b;
}