function removeSymbol(all, symbol) {
    var index = all.findIndex(function(item) {
        return item.symbolId == symbol.symbolId;
    });
    all.splice(index, 1);
}