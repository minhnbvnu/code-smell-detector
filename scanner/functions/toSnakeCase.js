function toSnakeCase(object, exceptions) {
  if (typeof object !== 'object' || assert.isArray(object) || object === null) {
    return object;
  }
  exceptions = exceptions || [];

  return Object.keys(object).reduce(function(p, key) {
    var newKey = exceptions.indexOf(key) === -1 ? camelToSnake(key) : key;
    p[newKey] = toSnakeCase(object[key]);
    return p;
  }, {});
}