function PolyNumberFormatter(intl, forceSimple, opts) {
      this.padTo = opts.padTo || 0;
      this.floor = opts.floor || false;

      if (!forceSimple && hasIntl()) {
        var intlOpts = {
          useGrouping: false
        };
        if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
        this.inf = getCachedINF(intl, intlOpts);
      }
    }