function naiveMemoize(fn) {
  let memoizedEntry;
  return function () {
    if (!memoizedEntry) {
      memoizedEntry = {result: null};
      memoizedEntry.result = fn();
    }
    return memoizedEntry.result;
  };
}