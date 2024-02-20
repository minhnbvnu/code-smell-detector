function getNotAvailableSymbolIds(instance, override) {
    var symbolIds = [instance.symbolId];
    var overridePathParts = override.path.split("/");
    for (var i = 0; i < overridePathParts.length; i++) {
        var overridePath = overridePathParts.slice(0,i+1).join("/");
        var overrideValue = instance.overrides.find(function(item) {
            return item.path == overridePath;
        }).value;
        symbolIds.push(overrideValue);
    }
    return symbolIds;
}