function InspectedElementPropsTree({
  bridge,
  element,
  inspectedElement,
  store
}) {
  const {
    readOnly
  } = react["useContext"](OptionsContext);
  const {
    canEditFunctionProps,
    canEditFunctionPropsDeletePaths,
    canEditFunctionPropsRenamePaths,
    props,
    type
  } = inspectedElement;
  const canDeletePaths = type === types["e" /* ElementTypeClass */] || canEditFunctionPropsDeletePaths;
  const canEditValues = !readOnly && (type === types["e" /* ElementTypeClass */] || canEditFunctionProps);
  const canRenamePaths = type === types["e" /* ElementTypeClass */] || canEditFunctionPropsRenamePaths;
  const entries = props != null ? Object.entries(props) : null;

  if (entries !== null) {
    entries.sort(alphaSortEntries);
  }

  const isEmpty = entries === null || entries.length === 0;

  const handleCopy = () => Object(clipboard["copy"])(serializeDataForCopy(props));

  return /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementSharedStyles_default.a.InspectedElementTree,
    "data-testname": "InspectedElementPropsTree"
  }, /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementSharedStyles_default.a.HeaderRow
  }, /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementSharedStyles_default.a.Header
  }, "props"), !isEmpty && /*#__PURE__*/react["createElement"](Button_Button, {
    onClick: handleCopy,
    title: "Copy to clipboard"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "copy"
  }))), !isEmpty && entries.map(([name, value]) => /*#__PURE__*/react["createElement"](KeyValue_KeyValue, {
    key: name,
    alphaSort: true,
    bridge: bridge,
    canDeletePaths: canDeletePaths,
    canEditValues: canEditValues,
    canRenamePaths: canRenamePaths,
    depth: 1,
    element: element,
    hidden: false,
    inspectedElement: inspectedElement,
    name: name,
    path: [name],
    pathRoot: "props",
    store: store,
    value: value
  })), canEditValues && /*#__PURE__*/react["createElement"](NewKeyValue_NewKeyValue, {
    bridge: bridge,
    depth: 0,
    hidden: false,
    inspectedElement: inspectedElement,
    path: [],
    store: store,
    type: "props"
  }));
}