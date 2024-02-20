function makeIterableFunction(value) {
    const fn = () => {};
    fn['@@iterator'] = function iterator() {
      let timesCalled = 0;
      return {
        next() {
          const done = timesCalled++ > 0;
          return {done, value: done ? undefined : value};
        },
      };
    };
    return fn;
  }