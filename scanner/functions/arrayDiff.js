function arrayDiff(newArray, oldArray) {
    var added = _.difference(newArray, oldArray);
    var removed = _.difference(oldArray, newArray);
    var kept = _.intersection(oldArray, newArray);
    return {added: added, removed: removed, kept: kept};
}