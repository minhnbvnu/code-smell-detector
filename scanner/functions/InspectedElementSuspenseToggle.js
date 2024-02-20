function InspectedElementSuspenseToggle({
  bridge,
  inspectedElement,
  store
}) {
  const {
    readOnly
  } = react["useContext"](OptionsContext);
  const {
    id,
    state,
    type
  } = inspectedElement;
  const canToggleSuspense = !readOnly && inspectedElement.canToggleSuspense;

  if (type !== types["n" /* ElementTypeSuspense */]) {
    return null;
  }

  const isSuspended = state !== null;

  const toggleSuspense = (path, value) => {
    const rendererID = store.getRendererIDForElement(id);

    if (rendererID !== null) {
      bridge.send('overrideSuspense', {
        id,
        rendererID,
        forceFallback: value
      });
    }
  };

  return /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementSharedStyles_default.a.InspectedElementTree
  }, /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementSharedStyles_default.a.HeaderRow
  }, /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementSharedStyles_default.a.Header
  }, "suspense")), /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementSharedStyles_default.a.ToggleSuspenseRow
  }, /*#__PURE__*/react["createElement"]("span", {
    className: InspectedElementSharedStyles_default.a.Name
  }, "Suspended"), canToggleSuspense ?
  /*#__PURE__*/
  // key is required to keep <EditableValue> and header row toggle button in sync
  react["createElement"](EditableValue_EditableValue, {
    key: isSuspended,
    overrideValue: toggleSuspense,
    path: ['suspense', 'Suspended'],
    value: isSuspended
  }) : /*#__PURE__*/react["createElement"]("span", {
    className: InspectedElementSharedStyles_default.a.Value
  }, isSuspended ? 'true' : 'false')));
}