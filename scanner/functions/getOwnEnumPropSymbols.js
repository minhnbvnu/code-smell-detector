function getOwnEnumPropSymbols(object) {
    return Object.getOwnPropertySymbols(object).filter(function (keySymbol) { return Object.prototype.propertyIsEnumerable.call(object, keySymbol); });
}