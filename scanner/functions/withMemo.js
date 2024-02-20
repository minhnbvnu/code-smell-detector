function withMemo(memo, render, cache, index) {
    const cached = cache[index];
    if (cached && isMemoSame(cached, memo)) {
      return cached;
    }
    const ret = render();
    ret.memo = memo.slice();
    return cache[index] = ret;
  }