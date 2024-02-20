function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}