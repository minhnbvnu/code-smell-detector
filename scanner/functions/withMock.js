function withMock(run) {
  return async () => {
    global.AbortController = MockAbortController;
    global.performance = MockPerformance;
    try {
      return await run();
    } finally {
      delete global.AbortController;
      delete global.performance;
    }
  };
}