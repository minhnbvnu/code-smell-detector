function useHighlightNativeElement() {
  const bridge = Object(react["useContext"])(BridgeContext);
  const store = Object(react["useContext"])(StoreContext);
  const highlightNativeElement = Object(react["useCallback"])(id => {
    const element = store.getElementByID(id);
    const rendererID = store.getRendererIDForElement(id);

    if (element !== null && rendererID !== null) {
      bridge.send('highlightNativeElement', {
        displayName: element.displayName,
        hideAfterTimeout: false,
        id,
        openNativeElementsPanel: false,
        rendererID,
        scrollIntoView: false
      });
    }
  }, [store, bridge]);
  const clearHighlightNativeElement = Object(react["useCallback"])(() => {
    bridge.send('clearNativeElementHighlight');
  }, [bridge]);
  return {
    highlightNativeElement,
    clearHighlightNativeElement
  };
}