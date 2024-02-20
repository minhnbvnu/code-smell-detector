function icon_toConsumableArray(arr) {
  return icon_arrayWithoutHoles(arr) || icon_iterableToArray(arr) || icon_unsupportedIterableToArray(arr) || icon_nonIterableSpread();
}