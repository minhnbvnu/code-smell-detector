function InspectedElementStateTree({
  bridge,
  element,
  inspectedElement,
  store
}) {
  const {
    state,
    type
  } = inspectedElement; // HostSingleton and HostResource may have state that we don't want to expose to users

  const isHostComponent = type === types["i" /* ElementTypeHostComponent */];
  const entries = state != null ? Object.entries(state) : null;
  const isEmpty = entries === null || entries.length === 0;

  if (isEmpty || isHostComponent) {
    return null;
  }

  if (entries !== null) {
    entries.sort(alphaSortEntries);
  }

  const handleCopy = () => Object(clipboard["copy"])(serializeDataForCopy(state));

  return /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementSharedStyles_default.a.InspectedElementTree
  }, /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementSharedStyles_default.a.HeaderRow
  }, /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementSharedStyles_default.a.Header
  }, "state"), !isEmpty && /*#__PURE__*/react["createElement"](Button_Button, {
    onClick: handleCopy,
    title: "Copy to clipboard"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "copy"
  }))), isEmpty && /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementSharedStyles_default.a.Empty
  }, "None"), !isEmpty && entries.map(([name, value]) => /*#__PURE__*/react["createElement"](KeyValue_KeyValue, {
    key: name,
    alphaSort: true,
    bridge: bridge,
    canDeletePaths: true,
    canEditValues: true,
    canRenamePaths: true,
    depth: 1,
    element: element,
    hidden: false,
    inspectedElement: inspectedElement,
    name: name,
    path: [name],
    pathRoot: "state",
    store: store,
    value: value
  })));
}