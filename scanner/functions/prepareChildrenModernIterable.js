function prepareChildrenModernIterable(childrenArray) {
  return {
    [Symbol.iterator]: function*() {
      // eslint-disable-next-line no-for-of-loops/no-for-of-loops
      for (const child of childrenArray) {
        yield child;
      }
    },
  };
}