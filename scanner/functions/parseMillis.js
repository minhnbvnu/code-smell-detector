function parseMillis(fraction) {
    // Return undefined (instead of 0) in these cases, where fraction is not set
    if (isUndefined(fraction) || fraction === null || fraction === "") {
      return undefined;
    } else {
      var f = parseFloat("0." + fraction) * 1000;
      return Math.floor(f);
    }
  }