function lazyStatic(cb) {
  let last = null;
  return () => {
    if (last == null) {
      last = {
        result: cb()
      };
    }

    return last.result;
  };
}