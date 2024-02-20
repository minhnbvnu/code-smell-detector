function internalDeepEqual(actual, expected, options, channel) {
    var opts = options || {};
    if (opts.strict ? objectIs(actual, expected) : actual === expected) {
      return true;
    }
    var actualBoxed = whichBoxedPrimitive(actual);
    var expectedBoxed = whichBoxedPrimitive(expected);
    if (actualBoxed !== expectedBoxed) {
      return false;
    }
    if (!actual || !expected || typeof actual !== "object" && typeof expected !== "object") {
      return opts.strict ? objectIs(actual, expected) : actual == expected;
    }
    var hasActual = channel.has(actual);
    var hasExpected = channel.has(expected);
    var sentinel;
    if (hasActual && hasExpected) {
      if (channel.get(actual) === channel.get(expected)) {
        return true;
      }
    } else {
      sentinel = {};
    }
    if (!hasActual) {
      channel.set(actual, sentinel);
    }
    if (!hasExpected) {
      channel.set(expected, sentinel);
    }
    return objEquiv(actual, expected, opts, channel);
  }