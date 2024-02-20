function isSupportedType(type) {
  return !!Object.values(types).find(function (typeVal) {
    return typeVal === type;
  });
}