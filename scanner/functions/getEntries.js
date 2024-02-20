function getEntries(type, collection, sortObjectKeys, from = 0, to = Infinity) {
  let res;

  if (type === 'Object') {
    let keys = Object.getOwnPropertyNames(collection);

    if (sortObjectKeys) {
      keys.sort(sortObjectKeys === true ? undefined : sortObjectKeys);
    }

    keys = keys.slice(from, to + 1);

    res = {
      entries: keys.map(key => ({ key, value: collection[key] }))
    };
  } else if (type === 'Array') {
    res = {
      entries: collection
        .slice(from, to + 1)
        .map((val, idx) => ({ key: idx + from, value: val }))
    };
  } else {
    let idx = 0;
    const entries = [];
    let done = true;

    const isMap = isIterableMap(collection);

    for (const item of collection) {
      if (idx > to) {
        done = false;
        break;
      }
      if (from <= idx) {
        if (isMap && Array.isArray(item)) {
          if (typeof item[0] === 'string' || typeof item[0] === 'number') {
            entries.push({ key: item[0], value: item[1] });
          } else {
            entries.push({
              key: `[entry ${idx}]`,
              value: {
                '[key]': item[0],
                '[value]': item[1]
              }
            });
          }
        } else {
          entries.push({ key: idx, value: item });
        }
      }
      idx++;
    }

    res = {
      hasMore: !done,
      entries
    };
  }

  return res;
}