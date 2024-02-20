function getCachedINF(locString, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var key = JSON.stringify([locString, opts]);
    var inf = intlNumCache[key];

    if (!inf) {
      inf = new Intl.NumberFormat(locString, opts);
      intlNumCache[key] = inf;
    }

    return inf;
  }