function SettingsModalContextToggle() {
  const {
    setIsModalShowing
  } = Object(react["useContext"])(SettingsModalContext);
  const store = Object(react["useContext"])(StoreContext);
  const {
    profilerStore
  } = store;
  const showFilterModal = Object(react["useCallback"])(() => setIsModalShowing(true), [setIsModalShowing]); // Updating preferences while profiling is in progress could break things (e.g. filtering)
  // Explicitly disallow it for now.

  const isProfilingSubscription = Object(react["useMemo"])(() => ({
    getCurrentValue: () => profilerStore.isProfiling,
    subscribe: callback => {
      profilerStore.addListener('isProfiling', callback);
      return () => profilerStore.removeListener('isProfiling', callback);
    }
  }), [profilerStore]);
  const isProfiling = useSubscription(isProfilingSubscription);
  return /*#__PURE__*/react["createElement"](Button_Button, {
    disabled: isProfiling,
    onClick: showFilterModal,
    title: "View settings"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "settings"
  }));
}