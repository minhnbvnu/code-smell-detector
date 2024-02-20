function UnsupportedBridgeProtocolDialog_UnsupportedBridgeProtocolDialog(_) {
  const {
    dialogs,
    dispatch
  } = Object(react["useContext"])(ModalDialogContext);
  const store = Object(react["useContext"])(StoreContext);
  const isVisible = !!dialogs.find(dialog => dialog.id === MODAL_DIALOG_ID);
  Object(react["useEffect"])(() => {
    const updateDialog = () => {
      if (!isVisible) {
        if (store.unsupportedBridgeProtocolDetected) {
          dispatch({
            canBeDismissed: false,
            id: MODAL_DIALOG_ID,
            type: 'SHOW',
            content: /*#__PURE__*/react["createElement"](DialogContent, {
              unsupportedBridgeProtocol: store.bridgeProtocol
            })
          });
        }
      } else {
        if (!store.unsupportedBridgeProtocolDetected) {
          dispatch({
            type: 'HIDE',
            id: MODAL_DIALOG_ID
          });
        }
      }
    };

    updateDialog();
    store.addListener('unsupportedBridgeProtocolDetected', updateDialog);
    return () => {
      store.removeListener('unsupportedBridgeProtocolDetected', updateDialog);
    };
  }, [isVisible, store]);
  return null;
}