function nfcall(method, ...args) {
  return BB.promisify(method)(...args);
}