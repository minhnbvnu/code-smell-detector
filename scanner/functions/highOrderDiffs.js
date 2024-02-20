function highOrderDiffs(cursor, later, units) {
    var differs = [["years", function (a, b) {
      return b.year - a.year;
    }], ["months", function (a, b) {
      return b.month - a.month + (b.year - a.year) * 12;
    }], ["weeks", function (a, b) {
      var days = dayDiff(a, b);
      return (days - days % 7) / 7;
    }], ["days", dayDiff]];
    var results = {};
    var lowestOrder, highWater;

    for (var _i = 0, _differs = differs; _i < _differs.length; _i++) {
      var _differs$_i = _differs[_i],
          unit = _differs$_i[0],
          differ = _differs$_i[1];

      if (units.indexOf(unit) >= 0) {
        var _cursor$plus;

        lowestOrder = unit;
        var delta = differ(cursor, later);
        highWater = cursor.plus((_cursor$plus = {}, _cursor$plus[unit] = delta, _cursor$plus));

        if (highWater > later) {
          var _cursor$plus2;

          cursor = cursor.plus((_cursor$plus2 = {}, _cursor$plus2[unit] = delta - 1, _cursor$plus2));
          delta -= 1;
        } else {
          cursor = highWater;
        }

        results[unit] = delta;
      }
    }

    return [cursor, results, highWater, lowestOrder];
  }