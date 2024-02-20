function useSwapApiGet(path, options) {
  return useAsyncData(
    async () => {
      if (!path) {
        return null;
      }
      return await swapApiRequest('GET', path, undefined, {
        ignoreUserErrors: true,
      });
    },
    ['swapApiGet', path],
    options,
  );
}