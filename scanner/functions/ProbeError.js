function ProbeError(message, code, statusCode) {
  Error.call(this);

  // Include stack trace in error object
  if (Error.captureStackTrace) {
    // Chrome and NodeJS
    Error.captureStackTrace(this, this.constructor);
  } else {
    // FF, IE 10+ and Safari 6+. Fallback for others
    this.stack = (new Error()).stack || '';
  }

  this.name = this.constructor.name;

  this.message = message;
  if (code) this.code = code;
  if (statusCode) this.statusCode = statusCode;
}