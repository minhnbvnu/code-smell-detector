function SelectedTreeHighlight_SelectedTreeHighlight(_) {
  const {
    lineHeight
  } = Object(react["useContext"])(SettingsContext);
  const store = Object(react["useContext"])(StoreContext);
  const treeFocused = Object(react["useContext"])(Components_TreeFocusedContext);
  const {
    ownerID,
    selectedElementID
  } = Object(react["useContext"])(TreeStateContext);
  const subscription = Object(react["useMemo"])(() => ({
    getCurrentValue: () => {
      if (selectedElementID === null || store.isInsideCollapsedSubTree(selectedElementID)) {
        return null;
      }

      const element = store.getElementByID(selectedElementID);

      if (element === null || element.isCollapsed || element.children.length === 0) {
        return null;
      }

      const startIndex = store.getIndexOfElementID(element.children[0]);

      if (startIndex === null) {
        return null;
      }

      let stopIndex = null;
      let current = element;

      while (current !== null) {
        if (current.isCollapsed || current.children.length === 0) {
          // We've found the last/deepest descendant.
          stopIndex = store.getIndexOfElementID(current.id);
          current = null;
        } else {
          const lastChildID = current.children[current.children.length - 1];
          current = store.getElementByID(lastChildID);
        }
      }

      if (stopIndex === null) {
        return null;
      }

      return {
        startIndex,
        stopIndex
      };
    },
    subscribe: callback => {
      store.addListener('mutated', callback);
      return () => {
        store.removeListener('mutated', callback);
      };
    }
  }), [selectedElementID, store]);
  const data = useSubscription(subscription);

  if (ownerID !== null) {
    return null;
  }

  if (data === null) {
    return null;
  }

  const {
    startIndex,
    stopIndex
  } = data;
  return /*#__PURE__*/react["createElement"]("div", {
    className: treeFocused ? SelectedTreeHighlight_default.a.Active : SelectedTreeHighlight_default.a.Inactive,
    style: {
      position: 'absolute',
      top: `${startIndex * lineHeight}px`,
      height: `${(stopIndex + 1 - startIndex) * lineHeight}px`
    }
  });
}