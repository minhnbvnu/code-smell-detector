function NativeStyleContextController({
  children
}) {
  const bridge = Object(react["useContext"])(BridgeContext);
  const store = Object(react["useContext"])(StoreContext);
  const getStyleAndLayout = Object(react["useCallback"])(id => {
    const element = store.getElementByID(id);

    if (element !== null) {
      return context_resource.read(element);
    } else {
      return null;
    }
  }, [store]); // It's very important that this context consumes selectedElementID and not NativeStyleID.
  // Otherwise the effect that sends the "inspect" message across the bridge-
  // would itself be blocked by the same render that suspends (waiting for the data).

  const {
    selectedElementID
  } = Object(react["useContext"])(TreeStateContext);
  const [currentStyleAndLayout, setCurrentStyleAndLayout] = Object(react["useState"])(null); // This effect handler invalidates the suspense cache and schedules rendering updates with React.

  Object(react["useEffect"])(() => {
    const onStyleAndLayout = ({
      id,
      layout,
      style
    }) => {
      const element = store.getElementByID(id);

      if (element !== null) {
        const styleAndLayout = {
          layout,
          style
        };
        const request = context_inProgressRequests.get(element);

        if (request != null) {
          context_inProgressRequests.delete(element);
          Object(react_dom["unstable_batchedUpdates"])(() => {
            request.resolveFn(styleAndLayout);
            setCurrentStyleAndLayout(styleAndLayout);
          });
        } else {
          context_resource.write(element, styleAndLayout); // Schedule update with React if the currently-selected element has been invalidated.

          if (id === selectedElementID) {
            setCurrentStyleAndLayout(styleAndLayout);
          }
        }
      }
    };

    bridge.addListener('NativeStyleEditor_styleAndLayout', onStyleAndLayout);
    return () => bridge.removeListener('NativeStyleEditor_styleAndLayout', onStyleAndLayout);
  }, [bridge, currentStyleAndLayout, selectedElementID, store]); // This effect handler polls for updates on the currently selected element.

  Object(react["useEffect"])(() => {
    if (selectedElementID === null) {
      return () => {};
    }

    const rendererID = store.getRendererIDForElement(selectedElementID);
    let timeoutID = null;

    const sendRequest = () => {
      timeoutID = null;

      if (rendererID !== null) {
        bridge.send('NativeStyleEditor_measure', {
          id: selectedElementID,
          rendererID
        });
      }
    }; // Send the initial measurement request.
    // We'll poll for an update in the response handler below.


    sendRequest();

    const onStyleAndLayout = ({
      id
    }) => {
      // If this is the element we requested, wait a little bit and then ask for another update.
      if (id === selectedElementID) {
        if (timeoutID !== null) {
          clearTimeout(timeoutID);
        }

        timeoutID = setTimeout(sendRequest, 1000);
      }
    };

    bridge.addListener('NativeStyleEditor_styleAndLayout', onStyleAndLayout);
    return () => {
      bridge.removeListener('NativeStyleEditor_styleAndLayout', onStyleAndLayout);

      if (timeoutID !== null) {
        clearTimeout(timeoutID);
      }
    };
  }, [bridge, selectedElementID, store]);
  const value = Object(react["useMemo"])(() => ({
    getStyleAndLayout
  }), // NativeStyle is used to invalidate the cache and schedule an update with React.
  [currentStyleAndLayout, getStyleAndLayout]);
  return /*#__PURE__*/react["createElement"](NativeStyleContext.Provider, {
    value: value
  }, children);
}