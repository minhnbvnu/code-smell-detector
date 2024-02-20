function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
    return Object.propertyIsEnumerable.call(target, symbol);
  }) : [];
}