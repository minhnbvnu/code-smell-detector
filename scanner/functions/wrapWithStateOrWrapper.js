function wrapWithStateOrWrapper(oldVisitor, state, wrapper) {
  const newVisitor = {};

  for (const key of Object.keys(oldVisitor)) {
    let fns = oldVisitor[key];
    if (!Array.isArray(fns)) continue;
    fns = fns.map(function (fn) {
      let newFn = fn;

      if (state) {
        newFn = function (path) {
          return fn.call(state, path, state);
        };
      }

      if (wrapper) {
        newFn = wrapper(state.key, key, newFn);
      }

      if (newFn !== fn) {
        newFn.toString = () => fn.toString();
      }

      return newFn;
    });
    newVisitor[key] = fns;
  }

  return newVisitor;
}