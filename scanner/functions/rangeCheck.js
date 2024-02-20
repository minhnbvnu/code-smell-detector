function rangeCheck(addr, range) {
    var i, ranges, parts;
    ranges = (!_.isArray(range)) ? [range] : range;
    for (i = 0; i < ranges.length; i++) {
        parts = ranges[i].split('/');
        parts[1] = parts[1] || '32'; // If no range provided, assume single host
        if (ipaddr.process(addr).match(ipaddr.process(parts[0]), parts[1])) {
            return true;
        }
    }
    return false;
}