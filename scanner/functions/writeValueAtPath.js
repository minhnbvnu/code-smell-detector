function writeValueAtPath(path, value, object) {
  if (!object) { object = {}; }

  return path.split(/\./g).reduce((memo, key, i, a) => {
    if (i === a.length - 1) {
      memo[key] = value;
      return object;
    } else if (memo[key] == undefined) {
      memo[key] = {};
      return memo[key];
    }
    return memo[key];
  }, object);
}