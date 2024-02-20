function useSyncMeta() {
  const { sync, updateSync } = useSync();
  const updateSyncMeta = useCallback(
    async (key) => {
      const syncMeta = sync?.syncMeta || {};
      syncMeta[key] = { ...(syncMeta[key] || {}), updateAt: Date.now() };
      await updateSync({ syncMeta });
    },
    [sync?.syncMeta, updateSync]
  );
  return { updateSyncMeta };
}