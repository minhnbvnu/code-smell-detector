function _swap(middlewares) {
  let result = false;
  const middlewaresClone = middlewares.slice(0);
  middlewaresClone.forEach(item => {
    let deps = item.options.dependencies || [];
    if (typeof deps === 'string') deps = deps.split(',');
    deps.forEach(dep => {
      if (swapDep(middlewares, dep, item.name)) result = true;
    });
  });
  return result;
}