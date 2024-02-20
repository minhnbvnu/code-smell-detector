function setMightHaveLoosePrim(a, b2, prim) {
    var altValue = findLooseMatchingPrimitives(prim);
    if (altValue != null) {
      return altValue;
    }
    return $setHas$3(b2, altValue) && !$setHas$3(a, altValue);
  }