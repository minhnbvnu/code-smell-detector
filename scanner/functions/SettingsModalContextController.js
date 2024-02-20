function SettingsModalContextController({
  children
}) {
  const [isModalShowing, setIsModalShowing] = Object(react["useState"])(false);
  const value = Object(react["useMemo"])(() => ({
    isModalShowing,
    setIsModalShowing
  }), [isModalShowing, setIsModalShowing]);
  return /*#__PURE__*/react["createElement"](SettingsModalContext.Provider, {
    value: value
  }, children);
}