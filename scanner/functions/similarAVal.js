function similarAVal(a, b, depth) {
    var typeA = a.getType(false),
        typeB = b.getType(false);
    if (!typeA || !typeB) return true;
    return similarType(typeA, typeB, depth);
  }