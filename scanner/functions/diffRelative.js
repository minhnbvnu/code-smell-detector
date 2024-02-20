function diffRelative(start, end, opts) {
    var round = isUndefined(opts.round) ? true : opts.round,
        format = function format(c, unit) {
      c = roundTo(c, round || opts.calendary ? 0 : 2, true);
      var formatter = end.loc.clone(opts).relFormatter(opts);
      return formatter.format(c, unit);
    },
        differ = function differ(unit) {
      if (opts.calendary) {
        if (!end.hasSame(start, unit)) {
          return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
        } else return 0;
      } else {
        return end.diff(start, unit).get(unit);
      }
    };

    if (opts.unit) {
      return format(differ(opts.unit), opts.unit);
    }

    for (var _iterator2 = _createForOfIteratorHelperLoose(opts.units), _step2; !(_step2 = _iterator2()).done;) {
      var unit = _step2.value;
      var count = differ(unit);

      if (Math.abs(count) >= 1) {
        return format(count, unit);
      }
    }

    return format(0, opts.units[opts.units.length - 1]);
  }