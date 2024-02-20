function protoKeys(object, ignoreKeys) {
  var result = [];
  for (var key in object) {
    if (!ignoreKeys || ignoreKeys.indexOf(key) === -1)
      result.push(key);
  }
  return result;
}