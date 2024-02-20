function createForLoopParams({ value, key, index }, memoArgs = []) {
    return createParamsList([value, key, index, ...memoArgs]);
  }