function trackProperties(isImmutable, ignore = [], obj, path = []) {
  const tracked = { value: obj };

  if (!isImmutable(obj)) {
    tracked.children = {};

    for (const key in obj) {
      const childPath = path.concat(key);
      if (ignore.length && ignore.indexOf(childPath.join('.')) !== -1) {
        continue;
      }

      tracked.children[key] = trackProperties(
        isImmutable,
        ignore,
        obj[key],
        childPath
      );
    }
  }
  return tracked;
}