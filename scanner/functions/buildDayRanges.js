function buildDayRanges(dayTable, dateProfile, dateEnv) {
        var ranges = [];
        for (var _i = 0, _a = dayTable.headerDates; _i < _a.length; _i++) {
            var date = _a[_i];
            ranges.push({
                start: dateEnv.add(date, dateProfile.minTime),
                end: dateEnv.add(date, dateProfile.maxTime)
            });
        }
        return ranges;
    }