function FSError(code, path) {
  if (!codes.hasOwnProperty(code)) {
    throw new Error('Programmer error, invalid error code: ' + code);
  }
  Error.call(this);
  const details = codes[code];
  let message = code + ', ' + details.message;
  if (path) {
    message += " '" + path + "'";
  }
  this.message = message;
  this.code = code;
  this.errno = details.errno;
  if (path !== undefined) {
    this.path = path;
  }
  Error.captureStackTrace(this, FSError);
}