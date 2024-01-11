function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}