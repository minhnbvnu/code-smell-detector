function ninvoke(obj, method, ...args) {
  return BB.promisify(obj[method].bind(obj))(...args);
}