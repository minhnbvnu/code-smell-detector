function DispatchError(message) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'DispatchError';
  this.message = message;
}