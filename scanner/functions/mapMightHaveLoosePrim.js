function mapMightHaveLoosePrim(a, b2, prim, item, opts, channel) {
    var altValue = findLooseMatchingPrimitives(prim);
    if (altValue != null) {
      return altValue;
    }
    var curB = $mapGet$1(b2, altValue);
    var looseOpts = object_assign({}, opts, { strict: false });
    if (typeof curB === "undefined" && !$mapHas$4(b2, altValue) || !internalDeepEqual(item, curB, looseOpts, channel)) {
      return false;
    }
    return !$mapHas$4(a, altValue) && internalDeepEqual(item, curB, looseOpts, channel);
  }