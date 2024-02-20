function requirePythonEnabled(fn) {
  return (...args) => {
    if (!PythonEnabled()) {
      return [];
    }
    return fn(...args);
  };
}