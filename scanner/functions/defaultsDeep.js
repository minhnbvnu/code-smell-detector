function defaultsDeep(current, defaults) {
  const target = Object.assign({}, current);
  Object.keys(defaults).forEach(key => {
    const value = defaults[key];
    if (!Object.prototype.hasOwnProperty.call(target, key)) {
      target[key] = value;
    } else if (typeof value === 'object' && typeof target[key] === 'object') {
      target[key] = defaultsDeep(target[key], value);
    }
  });
  return target;
}