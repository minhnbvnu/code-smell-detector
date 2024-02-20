function getCachedRTF(locString, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _opts = opts,
        base = _opts.base,
        cacheKeyOpts = _objectWithoutPropertiesLoose(_opts, ["base"]); // exclude `base` from the options


    var key = JSON.stringify([locString, cacheKeyOpts]);
    var inf = intlRelCache[key];

    if (!inf) {
      inf = new Intl.RelativeTimeFormat(locString, opts);
      intlRelCache[key] = inf;
    }

    return inf;
  }