function withAsyncContext(getAwaitable) {
    const ctx = getCurrentInstance();
    if (!ctx) {
      warn(
        `withAsyncContext called without active current instance. This is likely a bug.`
      );
    }
    let awaitable = getAwaitable();
    unsetCurrentInstance();
    if (isPromise(awaitable)) {
      awaitable = awaitable.catch((e) => {
        setCurrentInstance(ctx);
        throw e;
      });
    }
    return [awaitable, () => setCurrentInstance(ctx)];
  }