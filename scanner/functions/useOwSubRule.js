function useOwSubRule() {
  const { setting, updateSetting } = useSetting();
  const { owSubrule = DEFAULT_OW_RULE } = setting;

  const updateOwSubrule = useCallback(
    async (obj) => {
      await updateSetting({ owSubrule: { ...owSubrule, ...obj } });
    },
    [owSubrule, updateSetting]
  );

  return { owSubrule, updateOwSubrule };
}