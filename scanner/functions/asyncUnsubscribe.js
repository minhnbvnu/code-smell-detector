function asyncUnsubscribe(obj, subscription, ...args) {
  return async(obj, ...args).finally(() => subscription.unsubscribe());
}