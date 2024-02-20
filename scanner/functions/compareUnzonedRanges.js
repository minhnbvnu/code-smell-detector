function compareUnzonedRanges(range1, range2) {
    return range1.startMs - range2.startMs; // earlier ranges go first
}