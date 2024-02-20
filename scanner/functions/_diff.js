function _diff (earlier, later, units, opts) {
    var _highOrderDiffs = highOrderDiffs(earlier, later, units),
        cursor = _highOrderDiffs[0],
        results = _highOrderDiffs[1],
        highWater = _highOrderDiffs[2],
        lowestOrder = _highOrderDiffs[3];

    var remainingMillis = later - cursor;
    var lowerOrderUnits = units.filter(function (u) {
      return ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0;
    });

    if (lowerOrderUnits.length === 0) {
      if (highWater < later) {
        var _cursor$plus3;

        highWater = cursor.plus((_cursor$plus3 = {}, _cursor$plus3[lowestOrder] = 1, _cursor$plus3));
      }

      if (highWater !== cursor) {
        results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
      }
    }

    var duration = Duration.fromObject(Object.assign(results, opts));

    if (lowerOrderUnits.length > 0) {
      var _Duration$fromMillis;

      return (_Duration$fromMillis = Duration.fromMillis(remainingMillis, opts)).shiftTo.apply(_Duration$fromMillis, lowerOrderUnits).plus(duration);
    } else {
      return duration;
    }
  }