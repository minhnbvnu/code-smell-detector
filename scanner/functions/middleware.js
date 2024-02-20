function middleware(options) {
    return immutableStateInvariantMiddleware(options)({getState});
  }