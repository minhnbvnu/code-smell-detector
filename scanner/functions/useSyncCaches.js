function useSyncCaches() {
  const { sync, updateSync, reloadSync } = useSync();

  const updateDataCache = useCallback(
    async (url) => {
      const dataCaches = sync?.dataCaches || {};
      dataCaches[url] = Date.now();
      await updateSync({ dataCaches });
    },
    [sync, updateSync]
  );

  const deleteDataCache = useCallback(
    async (url) => {
      const dataCaches = sync?.dataCaches || {};
      delete dataCaches[url];
      await updateSync({ dataCaches });
    },
    [sync, updateSync]
  );

  return {
    dataCaches: sync?.dataCaches || {},
    updateDataCache,
    deleteDataCache,
    reloadSync,
  };
}