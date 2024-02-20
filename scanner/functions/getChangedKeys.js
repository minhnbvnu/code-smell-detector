function getChangedKeys(prev, next) {
    if (prev == null || next == null) {
      return null;
    } // We can't report anything meaningful for hooks changes.


    if (next.hasOwnProperty('baseState') && next.hasOwnProperty('memoizedState') && next.hasOwnProperty('next') && next.hasOwnProperty('queue')) {
      return null;
    }

    const keys = new Set([...Object.keys(prev), ...Object.keys(next)]);
    const changedKeys = []; // eslint-disable-next-line no-for-of-loops/no-for-of-loops

    for (const key of keys) {
      if (prev[key] !== next[key]) {
        changedKeys.push(key);
      }
    }

    return changedKeys;
  }