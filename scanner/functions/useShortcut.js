function useShortcut(action) {
  const { setting, updateSetting } = useSetting();
  const shortcuts = setting?.shortcuts || DEFAULT_SHORTCUTS;
  const shortcut = shortcuts[action] || [];

  const setShortcut = useCallback(
    async (val) => {
      Object.assign(shortcuts, { [action]: val });
      await updateSetting({ shortcuts });
    },
    [action, shortcuts, updateSetting]
  );

  return { shortcut, setShortcut };
}