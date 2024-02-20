function lazyGet(obj, key) {
  if (!obj) return undefined;

  var meta = metaFor(obj, false);
  // check if object meant only to be a prototype
  if (meta.proto === obj) return undefined;

  if (key === "@each") return get(obj, key);

  // if a CP only return cached value
  var desc = meta.descs[key];
  if (desc && desc._cacheable) {
    if (key in meta.cache) {
      return meta.cache[key];
    } else {
      return undefined;
    }
  }

  return get(obj, key);
}