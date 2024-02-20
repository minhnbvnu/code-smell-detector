function ModalDialogContextController({
  children
}) {
  const [state, dispatch] = Object(react["useReducer"])(ModalDialog_dialogReducer, {
    dialogs: []
  });
  const value = Object(react["useMemo"])(() => ({
    dialogs: state.dialogs,
    dispatch
  }), [state, dispatch]);
  return /*#__PURE__*/react["createElement"](ModalDialogContext.Provider, {
    value: value
  }, children);
}