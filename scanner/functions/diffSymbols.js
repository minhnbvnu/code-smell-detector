function diffSymbols(symbol1, symbol2) {
    if (symbol1.layers().count() == symbol2.layers().count()) {
        var diff = [];
        symbol1.layers().forEach(function(layer, index) {
            diff.push(layer.propertiesAreEqual_forPurpose(symbol2.layers().objectAtIndex(index), 1));
        });
        return diff.every(function(item) {
            return item == true;
        });
    } else {
        return false;
    }
}