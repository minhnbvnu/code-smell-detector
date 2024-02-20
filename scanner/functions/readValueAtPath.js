function readValueAtPath(path, object) {
  if (!path) { return object; }

  return path.split(/\./g).reduce((memo, key) => {
    if (memo == undefined) { return memo; }
    return memo[key];
  }, object);
}