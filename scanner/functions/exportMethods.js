function exportMethods(arr, fn) {
  arr.forEach(function(methodName) {
    exports[methodName] = partial(fn, methodName);
  });
}