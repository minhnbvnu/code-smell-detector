function func_invoke(obj, method) {
  return function () {
    return obj[method].apply(obj, arguments);
  };
}