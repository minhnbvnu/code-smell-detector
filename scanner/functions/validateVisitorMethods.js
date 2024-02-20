function validateVisitorMethods(path, val) {
  const fns = [].concat(val);

  for (const fn of fns) {
    if (typeof fn !== "function") {
      throw new TypeError(`Non-function found defined in ${path} with type ${typeof fn}`);
    }
  }
}