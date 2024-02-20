function dictDiff(newDict, oldDict) {
    var newKeys = Object.keys(newDict);
    var oldKeys = Object.keys(oldDict);

    var added = _.difference(newKeys, oldKeys).map(function(key) { return newDict[key]; });
    var removed = _.difference(oldKeys, newKeys).map(function(key) { return oldDict[key]; });
    var kept = _.intersection(newKeys, oldKeys).map(function(key) { return newDict[key]; });
    return {added: added, removed: removed, kept: kept};
}