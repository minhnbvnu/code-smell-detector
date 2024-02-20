function ensureEntranceObjects(obj) {
  for (const key of Object.keys(obj)) {
    if (shouldIgnoreKey(key)) continue;
    const fns = obj[key];

    if (typeof fns === "function") {
      obj[key] = {
        enter: fns
      };
    }
  }
}