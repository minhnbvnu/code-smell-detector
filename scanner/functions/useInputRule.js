function useInputRule() {
  const { setting, updateSetting } = useSetting();
  const inputRule = setting?.inputRule || DEFAULT_INPUT_RULE;

  const updateInputRule = useCallback(
    async (obj) => {
      Object.assign(inputRule, obj);
      await updateSetting({ inputRule });
    },
    [inputRule, updateSetting]
  );

  return { inputRule, updateInputRule };
}