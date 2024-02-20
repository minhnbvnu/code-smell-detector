function mapEquiv(a, b2, opts, channel) {
    if ($mapSize(a) !== $mapSize(b2)) {
      return false;
    }
    var iA = getIterator$1(a);
    var iB = getIterator$1(b2);
    var resultA;
    var resultB;
    var set;
    var key;
    var item1;
    var item2;
    while ((resultA = iA.next()) && !resultA.done) {
      key = resultA.value[0];
      item1 = resultA.value[1];
      if (key && typeof key === "object") {
        if (!set) {
          set = new $Set$2();
        }
        $setAdd(set, key);
      } else {
        item2 = $mapGet$1(b2, key);
        if (typeof item2 === "undefined" && !$mapHas$4(b2, key) || !internalDeepEqual(item1, item2, opts, channel)) {
          if (opts.strict) {
            return false;
          }
          if (!mapMightHaveLoosePrim(a, b2, key, item1, opts, channel)) {
            return false;
          }
          if (!set) {
            set = new $Set$2();
          }
          $setAdd(set, key);
        }
      }
    }
    if (set) {
      while ((resultB = iB.next()) && !resultB.done) {
        key = resultB.value[0];
        item2 = resultB.value[1];
        if (key && typeof key === "object") {
          if (!mapHasEqualEntry(set, a, key, item2, opts, channel)) {
            return false;
          }
        } else if (!opts.strict && (!a.has(key) || !internalDeepEqual($mapGet$1(a, key), item2, opts, channel)) && !mapHasEqualEntry(set, a, key, item2, object_assign({}, opts, { strict: false }), channel)) {
          return false;
        }
      }
      return $setSize(set) === 0;
    }
    return true;
  }