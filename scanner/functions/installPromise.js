function installPromise(proxy, promise) {
  promise.then(function(value) {
    set(proxy, 'isFulfilled', true);
    set(proxy, 'content', value);

    return value;
  }, function(reason) {
    set(proxy, 'isRejected', true);
    set(proxy, 'reason', reason);
  }).fail(rethrow);
}