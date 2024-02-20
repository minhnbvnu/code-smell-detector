function InspectedElementStyleXPlugin_InspectedElementStyleXPlugin({
  bridge,
  element,
  inspectedElement,
  store
}) {
  if (!DevToolsFeatureFlags_extension_oss["f" /* enableStyleXFeatures */]) {
    return null;
  }

  const styleXPlugin = inspectedElement.plugins.stylex;

  if (styleXPlugin == null) {
    return null;
  }

  const {
    resolvedStyles,
    sources
  } = styleXPlugin;
  return /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementSharedStyles_default.a.InspectedElementTree
  }, /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementSharedStyles_default.a.HeaderRow
  }, /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementSharedStyles_default.a.Header
  }, "stylex")), sources.map(source => /*#__PURE__*/react["createElement"]("div", {
    key: source,
    className: InspectedElementStyleXPlugin_default.a.Source
  }, source)), Object.entries(resolvedStyles).map(([name, value]) => /*#__PURE__*/react["createElement"](KeyValue_KeyValue, {
    key: name,
    alphaSort: true,
    bridge: bridge,
    canDeletePaths: false,
    canEditValues: false,
    canRenamePaths: false,
    depth: 1,
    element: element,
    hidden: false,
    inspectedElement: inspectedElement,
    name: name,
    path: [name],
    pathRoot: "stylex",
    store: store,
    value: value
  })));
}