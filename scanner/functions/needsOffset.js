function needsOffset (m) {
        var isUnixTimestamp = (m._f === 'X' || m._f === 'x');
        return !!(m._a && (m._tzm === undefined) && !isUnixTimestamp);
    }