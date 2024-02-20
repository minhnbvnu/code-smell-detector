function useSoftReset() {
  const dispatch = useDispatch();
  const { wipe } = useCountervaluesPolling();

  return useCallback(async () => {
    log("clear-cache", "clearBridgeCache()");
    clearBridgeCache();
    log("clear-cache", "cleanAccountsCache()");
    dispatch(cleanAccountsCache());
    await delay(500);
    log("clear-cache", "cleanCache()");
    await cleanCache();
    wipe();
    log("clear-cache", "reload()");
    reload();
  }, [dispatch, wipe]);
}