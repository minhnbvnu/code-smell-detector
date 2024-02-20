function WarnIfLegacyBackendDetected_WarnIfLegacyBackendDetected(_) {
  const bridge = Object(react["useContext"])(BridgeContext);
  const {
    dispatch
  } = Object(react["useContext"])(ModalDialogContext); // Detect pairing with legacy v3 backend.
  // We do this by listening to a message that it broadcasts but the v4 backend doesn't.
  // In this case the frontend should show upgrade instructions.

  Object(react["useEffect"])(() => {
    // Wall.listen returns a cleanup function
    let unlisten = bridge.wall.listen(message => {
      switch (message.type) {
        case 'call':
        case 'event':
        case 'many-events':
          // Any of these types indicate the v3 backend.
          dispatch({
            canBeDismissed: false,
            id: 'WarnIfLegacyBackendDetected',
            type: 'SHOW',
            title: 'DevTools v4 is incompatible with this version of React',
            content: /*#__PURE__*/react["createElement"](InvalidBackendDetected, null)
          }); // Once we've identified the backend version, it's safe to unsubscribe.

          if (typeof unlisten === 'function') {
            unlisten();
            unlisten = null;
          }

          break;

        default:
          break;
      }

      switch (message.event) {
        case 'isBackendStorageAPISupported':
        case 'isNativeStyleEditorSupported':
        case 'operations':
        case 'overrideComponentFilters':
          // Any of these is sufficient to indicate a v4 backend.
          // Once we've identified the backend version, it's safe to unsubscribe.
          if (typeof unlisten === 'function') {
            unlisten();
            unlisten = null;
          }

          break;

        default:
          break;
      }
    });
    return () => {
      if (typeof unlisten === 'function') {
        unlisten();
        unlisten = null;
      }
    };
  }, [bridge, dispatch]);
  return null;
}