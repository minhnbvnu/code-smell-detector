function makeTransformParams(filename, sourceCode, options) {
  if (filename.endsWith('.json')) {
    sourceCode = 'module.exports=' + sourceCode;
  }
  return {filename, sourceCode, options};
}