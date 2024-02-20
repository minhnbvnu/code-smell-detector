function promiseCallback(results) {
  return {
    promise: async () => results,
  };
}