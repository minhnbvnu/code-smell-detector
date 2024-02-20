function SettingProvider({ children }) {
  const { data, update, reload } = useStorage(STOKEY_SETTING, DEFAULT_SETTING);
  const { updateSyncMeta } = useSyncMeta();

  const syncSetting = useMemo(
    () =>
      debounce(() => {
        trySyncSetting();
      }, [2000]),
    []
  );

  const updateSetting = useCallback(
    async (obj) => {
      await update(obj);
      await updateSyncMeta(KV_SETTING_KEY);
      syncSetting();
    },
    [update, syncSetting, updateSyncMeta]
  );

  if (!data) {
    return;
  }

  return (
    <SettingContext.Provider
      value={{
        setting: data,
        updateSetting,
        reloadSetting: reload,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}