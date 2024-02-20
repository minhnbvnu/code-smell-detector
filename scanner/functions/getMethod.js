function getMethod(obj, key) {
  let value = obj[key];

  if (value == null)
    return undefined;

  if (typeof value !== 'function')
    throw new TypeError(value + ' is not a function');

  return value;
}