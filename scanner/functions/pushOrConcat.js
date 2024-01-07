function pushOrConcat(base, toPush) {
  if (toPush) {
    if (isArray(toPush)) {
      // base = base.concat(toPush);
      Array.prototype.push.apply(base, toPush);
    } else {
      base.push(toPush);
    }
  }

  return base;
}