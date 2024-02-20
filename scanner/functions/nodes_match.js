function nodes_match(a, b2) {
    if (!!a !== !!b2)
      return false;
    if (Array.isArray(a) !== Array.isArray(b2))
      return false;
    if (a && typeof a === "object") {
      if (Array.isArray(a)) {
        if (a.length !== b2.length)
          return false;
        return a.every((child, i2) => nodes_match(child, b2[i2]));
      }
      const a_keys = Object.keys(a).sort();
      const b_keys = Object.keys(b2).sort();
      if (a_keys.length !== b_keys.length)
        return false;
      let i = a_keys.length;
      while (i--) {
        const key = a_keys[i];
        if (b_keys[i] !== key)
          return false;
        if (key === "start" || key === "end")
          continue;
        if (!nodes_match(a[key], b2[key])) {
          return false;
        }
      }
      return true;
    }
    return a === b2;
  }