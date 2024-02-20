function setEquiv(a, b2, opts, channel) {
    if ($setSize(a) !== $setSize(b2)) {
      return false;
    }
    var iA = getIterator$1(a);
    var iB = getIterator$1(b2);
    var resultA;
    var resultB;
    var set;
    while ((resultA = iA.next()) && !resultA.done) {
      if (resultA.value && typeof resultA.value === "object") {
        if (!set) {
          set = new $Set$2();
        }
        $setAdd(set, resultA.value);
      } else if (!$setHas$3(b2, resultA.value)) {
        if (opts.strict) {
          return false;
        }
        if (!setMightHaveLoosePrim(a, b2, resultA.value)) {
          return false;
        }
        if (!set) {
          set = new $Set$2();
        }
        $setAdd(set, resultA.value);
      }
    }
    if (set) {
      while ((resultB = iB.next()) && !resultB.done) {
        if (resultB.value && typeof resultB.value === "object") {
          if (!setHasEqualElement(set, resultB.value, opts.strict, channel)) {
            return false;
          }
        } else if (!opts.strict && !$setHas$3(a, resultB.value) && !setHasEqualElement(set, resultB.value, opts.strict, channel)) {
          return false;
        }
      }
      return $setSize(set) === 0;
    }
    return true;
  }