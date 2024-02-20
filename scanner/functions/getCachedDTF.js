function getCachedDTF(locString, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var key = JSON.stringify([locString, opts]);
    var dtf = intlDTCache[key];

    if (!dtf) {
      dtf = new Intl.DateTimeFormat(locString, opts);
      intlDTCache[key] = dtf;
    }

    return dtf;
  }