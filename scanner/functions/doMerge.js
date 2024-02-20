function doMerge(source, target) {
  const merged = {};
  for (let p in source) {
    if (isObject(source[p]) && isObject(target[p])) {
      merged[p] = doMerge(source[p], target[p]);
    } else {
      merged[p] = source[p];
    }
  }

  return Object.assign(target, merged);
}