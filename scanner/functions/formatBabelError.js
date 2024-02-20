function formatBabelError(err, filename) {
  var error = new TransformError();
  error.type = 'TransformError';
  error.message = (err.type || error.type) + ' ' + err.message;
  error.stack = err.stack;
  error.snippet = err.codeFrame;
  error.lineNumber = err.loc.line;
  error.column = err.loc.column;
  error.filename = filename;
  error.description = err.message;
  return error;
}