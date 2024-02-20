function createReadonlyMethod(type) {
  return function(...args) {
    if (false) {}
    return type === "delete" ? false : this;
  };
}