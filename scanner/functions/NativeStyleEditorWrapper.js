function NativeStyleEditorWrapper(_) {
  const store = Object(react["useContext"])(StoreContext);
  const subscription = Object(react["useMemo"])(() => ({
    getCurrentValue: () => store.supportsNativeStyleEditor,
    subscribe: callback => {
      store.addListener('supportsNativeStyleEditor', callback);
      return () => {
        store.removeListener('supportsNativeStyleEditor', callback);
      };
    }
  }), [store]);
  const supportsNativeStyleEditor = useSubscription(subscription);

  if (!supportsNativeStyleEditor) {
    return null;
  }

  return /*#__PURE__*/react["createElement"](NativeStyleEditor, null);
}