function diffByUnit(a, b, unit) {
    return moment.duration(Math.round(a.diff(b, unit, true)), // returnFloat=true
    unit);
}