function ControllerError(message) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'ControllerError';
  this.message = message;
}