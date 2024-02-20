function useTranbox() {
  const { setting, updateSetting } = useSetting();
  const tranboxSetting = setting?.tranboxSetting || DEFAULT_TRANBOX_SETTING;

  const updateTranbox = useCallback(
    async (obj) => {
      Object.assign(tranboxSetting, obj);
      await updateSetting({ tranboxSetting });
    },
    [tranboxSetting, updateSetting]
  );

  return { tranboxSetting, updateTranbox };
}