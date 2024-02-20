function transformData(data, headers, status, fns) {
  if (isFunction(fns)) {
    return fns(data, headers, status);
  }

  forEach(fns, function(fn) {
    data = fn(data, headers, status);
  });

  return data;
}