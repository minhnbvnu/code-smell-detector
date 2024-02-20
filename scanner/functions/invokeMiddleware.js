function invokeMiddleware(stack) {
  const s = new XVIZMiddlewareStack(stack);

  NO_ARGS_METHODS.forEach(methodName => {
    s[methodName]();
  });

  METHODS.forEach(methodName => {
    s[methodName]({kind: methodName});
  });

  return s;
}