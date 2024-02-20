function InspectedElementContextTree({
  bridge,
  element,
  inspectedElement,
  store
}) {
  const {
    hasLegacyContext,
    context,
    type
  } = inspectedElement;
  const isReadOnly = type !== types["e" /* ElementTypeClass */] && type !== types["h" /* ElementTypeFunction */];
  const entries = context != null ? Object.entries(context) : null;

  if (entries !== null) {
    entries.sort(alphaSortEntries);
  }

  const isEmpty = entries === null || entries.length === 0;

  const handleCopy = () => Object(clipboard["copy"])(serializeDataForCopy(context)); // We add an object with a "value" key as a wrapper around Context data
  // so that we can use the shared <KeyValue> component to display it.
  // This wrapper object can't be renamed.
  // $FlowFixMe[missing-local-annot]


  const canRenamePathsAtDepth = depth => depth > 1;

  if (isEmpty) {
    return null;
  } else {
    return /*#__PURE__*/react["createElement"]("div", {
      className: InspectedElementSharedStyles_default.a.InspectedElementTree
    }, /*#__PURE__*/react["createElement"]("div", {
      className: InspectedElementSharedStyles_default.a.HeaderRow
    }, /*#__PURE__*/react["createElement"]("div", {
      className: InspectedElementSharedStyles_default.a.Header
    }, hasLegacyContext ? 'legacy context' : 'context'), !isEmpty && /*#__PURE__*/react["createElement"](Button_Button, {
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
      canDeletePaths: !isReadOnly,
      canEditValues: !isReadOnly,
      canRenamePaths: !isReadOnly,
      canRenamePathsAtDepth: canRenamePathsAtDepth,
      depth: 1,
      element: element,
      hidden: false,
      inspectedElement: inspectedElement,
      name: name,
      path: [name],
      pathRoot: "context",
      store: store,
      type: "context",
      value: value
    })));
  }
}