function SettingsModal_SettingsModal(_) {
  const {
    isModalShowing,
    setIsModalShowing
  } = Object(react["useContext"])(SettingsModalContext);
  const store = Object(react["useContext"])(StoreContext);
  const {
    profilerStore
  } = store; // Updating preferences while profiling is in progress could break things (e.g. filtering)
  // Explicitly disallow it for now.

  const isProfilingSubscription = Object(react["useMemo"])(() => ({
    getCurrentValue: () => profilerStore.isProfiling,
    subscribe: callback => {
      profilerStore.addListener('isProfiling', callback);
      return () => profilerStore.removeListener('isProfiling', callback);
    }
  }), [profilerStore]);
  const isProfiling = useSubscription(isProfilingSubscription);

  if (isProfiling && isModalShowing) {
    setIsModalShowing(false);
  }

  if (!isModalShowing) {
    return null;
  }

  return /*#__PURE__*/react["createElement"](SettingsModalImpl, null);
}