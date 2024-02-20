function ReloadAndProfileButton({
  disabled
}) {
  const bridge = Object(react["useContext"])(BridgeContext);
  const store = Object(react["useContext"])(StoreContext);
  const subscription = Object(react["useMemo"])(() => ({
    getCurrentValue: () => ({
      recordChangeDescriptions: store.recordChangeDescriptions,
      supportsReloadAndProfile: store.supportsReloadAndProfile
    }),
    subscribe: callback => {
      store.addListener('recordChangeDescriptions', callback);
      store.addListener('supportsReloadAndProfile', callback);
      return () => {
        store.removeListener('recordChangeDescriptions', callback);
        store.removeListener('supportsReloadAndProfile', callback);
      };
    }
  }), [store]);
  const {
    recordChangeDescriptions,
    supportsReloadAndProfile
  } = useSubscription(subscription);
  const reloadAndProfile = Object(react["useCallback"])(() => {
    // TODO If we want to support reload-and-profile for e.g. React Native,
    // we might need to also start profiling here before reloading the app (since DevTools itself isn't reloaded).
    // We'd probably want to do this before reloading though, to avoid sending a message on a disconnected port in the browser.
    // For now, let's just skip doing it entirely to avoid paying snapshot costs for data we don't need.
    // startProfiling();
    bridge.send('reloadAndProfile', recordChangeDescriptions);
  }, [bridge, recordChangeDescriptions]);

  if (!supportsReloadAndProfile) {
    return null;
  }

  return /*#__PURE__*/react["createElement"](Button_Button, {
    disabled: disabled,
    onClick: reloadAndProfile,
    title: "Reload and start profiling"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "reload"
  }));
}