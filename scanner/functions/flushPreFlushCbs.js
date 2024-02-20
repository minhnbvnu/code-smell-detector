function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (; i < queue.length; i++) {
      const cb = queue[i];
      if (cb && cb.pre) {
        if (checkRecursiveUpdates(seen, cb)) {
          continue;
        }
        queue.splice(i, 1);
        i--;
        cb();
      }
    }
  }