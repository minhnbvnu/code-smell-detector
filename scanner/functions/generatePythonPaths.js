function generatePythonPaths(prefix) {
  return pythonPaths.map(p => `${prefix}${p}`).join(':');
}