function AbortError() {
  Error.call(this);
  this.code = 'ABORT_ERR';
  this.name = 'AbortError';
  Error.captureStackTrace(this, AbortError);
}