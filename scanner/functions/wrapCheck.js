function wrapCheck(wrapper, fn) {
  const newFn = function (path) {
    if (wrapper.checkPath(path)) {
      return fn.apply(this, arguments);
    }
  };

  newFn.toString = () => fn.toString();

  return newFn;
}