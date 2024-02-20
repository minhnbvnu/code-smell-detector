function UnsupportedVersionDialog_UnsupportedVersionDialog(_) {
  const {
    dispatch
  } = Object(react["useContext"])(ModalDialogContext);
  const store = Object(react["useContext"])(StoreContext);
  const [state, setState] = Object(react["useState"])('dialog-not-shown');
  Object(react["useEffect"])(() => {
    if (state === 'dialog-not-shown') {
      const showDialog = () => {
        Object(react_dom["unstable_batchedUpdates"])(() => {
          setState('show-dialog');
          dispatch({
            canBeDismissed: true,
            id: 'UnsupportedVersionDialog',
            type: 'SHOW',
            content: /*#__PURE__*/react["createElement"](UnsupportedVersionDialog_DialogContent, null)
          });
        });
      };

      if (store.unsupportedRendererVersionDetected) {
        showDialog();
      } else {
        store.addListener('unsupportedRendererVersionDetected', showDialog);
        return () => {
          store.removeListener('unsupportedRendererVersionDetected', showDialog);
        };
      }
    }
  }, [state, store]);
  return null;
}