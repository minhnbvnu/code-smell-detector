function ownEnumerableKeys(obj) {
  var keys = Object.getOwnPropertyNames(obj);

  if (Object.getOwnPropertySymbols) {
    keys = keys.concat(Object.getOwnPropertySymbols(obj));
  }

  return keys.filter(function (key) {
    // this file adds false if not defined
    if (typeof obj[key] === "undefined") return false;

    // otherwise normal thing
    return propIsEnumerable.call(obj, key);
  });
}