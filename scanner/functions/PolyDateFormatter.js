function PolyDateFormatter(dt, intl, opts) {
      this.opts = opts;
      this.hasIntl = hasIntl();
      var z;

      if (dt.zone.universal && this.hasIntl) {
        // Chromium doesn't support fixed-offset zones like Etc/GMT+8 in its formatter,
        // See https://bugs.chromium.org/p/chromium/issues/detail?id=364374.
        // So we have to make do. Two cases:
        // 1. The format options tell us to show the zone. We can't do that, so the best
        // we can do is format the date in UTC.
        // 2. The format options don't tell us to show the zone. Then we can adjust them
        // the time and tell the formatter to show it to us in UTC, so that the time is right
        // and the bad zone doesn't show up.
        // We can clean all this up when Chrome fixes this.
        z = "UTC";

        if (opts.timeZoneName) {
          this.dt = dt;
        } else {
          this.dt = dt.offset === 0 ? dt : DateTime.fromMillis(dt.ts + dt.offset * 60 * 1000);
        }
      } else if (dt.zone.type === "local") {
        this.dt = dt;
      } else {
        this.dt = dt;
        z = dt.zone.name;
      }

      if (this.hasIntl) {
        var intlOpts = Object.assign({}, this.opts);

        if (z) {
          intlOpts.timeZone = z;
        }

        this.dtf = getCachedDTF(intl, intlOpts);
      }
    }