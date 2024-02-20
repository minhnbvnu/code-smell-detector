function createProxyHandler(origObj) {
  function recordUsage(h, key) {
    let used = h[AFFECTED].get(origObj);

    if (!used) {
      used = new Set();
      h[AFFECTED].set(origObj, used);
    }

    used.add(key);
  }

  return {
    get(target, key) {
      if (key === ORIG_SYMBOL) {
        return origObj;
      }

      if (key === 'toJSON') {
        return function toJSON() {
          return target;
        };
      }

      let usedKey = key;
      let value = target[String(key)];

      // special access for path keys
      if (
        typeof key === 'string' &&
        key.indexOf('.') !== -1 &&
        !(key in target)
      ) {
        value = ObjectMap.get(target, key) ?? value;
        usedKey = `$key:${key}`;
      }

      recordUsage(this, usedKey);

      return createDeepProxy(value, this[AFFECTED], this[CACHE]);
    },
    has(target, key) {
      recordUsage(this, key);

      return key in target;
    },
    ownKeys(target) {
      recordUsage(this, OWN_KEYS_SYMBOL);

      return Reflect.ownKeys(target);
    }
  };
}