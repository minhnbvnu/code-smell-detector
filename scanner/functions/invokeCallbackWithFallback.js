function invokeCallbackWithFallback(callbacks, name, ctx, arg) {
  const result = callbacks[name].call(ctx, arg);

  if (typeof result === 'undefined') {
    return defaultCallbacks[name].call(ctx, arg);
  }

  return result;
}