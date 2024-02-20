function dFillDatesToNow(myDates, utcoffset) {
    // Hack, sort the keys in the object
    dates = Object.keys(myDates)
        .sort()
        .reduce(function (acc, key) {
            acc[key] = myDates[key];
            return acc;
        }, {});

    var daysRange = (s, e) => {
        var s = new Date(s);
        var e = new Date(e);
        var o = {};
        for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
            o[new Date(d).toISOString().substring(0, 10)] = 0;
        }
        return o;
    };

    var sortedAvailableDates = Object.keys(dates).sort((a, b) => {
        return a > b;
    });

    return {
        ...daysRange(sortedAvailableDates[0], getUTCNow(utcoffset)),
        ...dates,
    };
}