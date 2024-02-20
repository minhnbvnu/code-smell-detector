function checkVector(v, length4, callerName = "") {
    if (config.debug && !validateVector(v, length4)) {
      throw new Error("math.gl: ".concat(callerName, " some fields set to invalid numbers'"));
    }
    return v;
  }