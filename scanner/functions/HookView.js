function HookView({
  element,
  hook,
  hookNames,
  id,
  inspectedElement,
  path
}) {
  const {
    canEditHooks,
    canEditHooksAndDeletePaths,
    canEditHooksAndRenamePaths
  } = inspectedElement;
  const {
    id: hookID,
    isStateEditable,
    subHooks,
    value
  } = hook;
  const isReadOnly = hookID == null || !isStateEditable;
  const canDeletePaths = !isReadOnly && canEditHooksAndDeletePaths;
  const canEditValues = !isReadOnly && canEditHooks;
  const canRenamePaths = !isReadOnly && canEditHooksAndRenamePaths;
  const bridge = Object(react["useContext"])(BridgeContext);
  const store = Object(react["useContext"])(StoreContext);
  const [isOpen, setIsOpen] = Object(react["useState"])(false);
  const toggleIsOpen = Object(react["useCallback"])(() => setIsOpen(prevIsOpen => !prevIsOpen), []);
  const contextMenuTriggerRef = Object(react["useRef"])(null);
  useContextMenu({
    data: {
      path: ['hooks', ...path],
      type: hook !== null && typeof hook === 'object' && hook.hasOwnProperty(hydration["d" /* meta */].type) ? hook[hydration["d" /* meta */].type] : typeof value
    },
    id: 'InspectedElement',
    ref: contextMenuTriggerRef
  });

  if (hook.hasOwnProperty(hydration["d" /* meta */].inspected)) {
    // This Hook is too deep and hasn't been hydrated.
    if (false) {}

    return /*#__PURE__*/react["createElement"]("div", {
      className: InspectedElementHooksTree_default.a.Hook
    }, /*#__PURE__*/react["createElement"]("div", {
      className: InspectedElementHooksTree_default.a.NameValueRow
    }, /*#__PURE__*/react["createElement"]("span", {
      className: InspectedElementHooksTree_default.a.TruncationIndicator
    }, "...")));
  } // Certain hooks are not editable at all (as identified by react-debug-tools).
  // Primitive hook names (e.g. the "State" name for useState) are also never editable.
  // $FlowFixMe[missing-local-annot]


  const canRenamePathsAtDepth = depth => isStateEditable && depth > 1;

  const isCustomHook = subHooks.length > 0;
  let name = hook.name;

  if (DevToolsFeatureFlags_extension_oss["d" /* enableProfilerChangedHookIndices */]) {
    if (hookID !== null) {
      name = /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("span", {
        className: InspectedElementHooksTree_default.a.PrimitiveHookNumber
      }, hookID + 1), name);
    }
  }

  const type = typeof value;
  let displayValue;
  let isComplexDisplayValue = false;
  const hookSource = hook.hookSource;
  const hookName = hookNames != null && hookSource != null ? hookNames.get(Object(hookNamesCache["b" /* getHookSourceLocationKey */])(hookSource)) : null;
  const hookDisplayName = hookName ? /*#__PURE__*/react["createElement"](react["Fragment"], null, name, !!hookName && /*#__PURE__*/react["createElement"]("span", {
    className: InspectedElementHooksTree_default.a.HookName
  }, "(", hookName, ")")) : name; // Format data for display to mimic the props/state/context for now.

  if (type === 'string') {
    displayValue = `"${value}"`;
  } else if (type === 'boolean') {
    displayValue = value ? 'true' : 'false';
  } else if (type === 'number') {
    displayValue = value;
  } else if (value === null) {
    displayValue = 'null';
  } else if (value === undefined) {
    displayValue = null;
  } else if (Object(isArray["a" /* default */])(value)) {
    isComplexDisplayValue = true;
    displayValue = 'Array';
  } else if (type === 'object') {
    isComplexDisplayValue = true;
    displayValue = 'Object';
  }

  if (isCustomHook) {
    const subHooksView = Object(isArray["a" /* default */])(subHooks) ? /*#__PURE__*/react["createElement"](InnerHooksTreeView, {
      element: element,
      hooks: subHooks,
      hookNames: hookNames,
      id: id,
      inspectedElement: inspectedElement,
      path: path.concat(['subHooks'])
    }) : /*#__PURE__*/react["createElement"](KeyValue_KeyValue, {
      alphaSort: false,
      bridge: bridge,
      canDeletePaths: canDeletePaths,
      canEditValues: canEditValues,
      canRenamePaths: canRenamePaths,
      canRenamePathsAtDepth: canRenamePathsAtDepth,
      depth: 1,
      element: element,
      hookID: hookID,
      hookName: hookName,
      inspectedElement: inspectedElement,
      name: "subHooks",
      path: path.concat(['subHooks']),
      store: store,
      type: "hooks",
      value: subHooks
    });

    if (isComplexDisplayValue) {
      return /*#__PURE__*/react["createElement"]("div", {
        className: InspectedElementHooksTree_default.a.Hook
      }, /*#__PURE__*/react["createElement"]("div", {
        ref: contextMenuTriggerRef,
        className: InspectedElementHooksTree_default.a.NameValueRow
      }, /*#__PURE__*/react["createElement"](ExpandCollapseToggle_ExpandCollapseToggle, {
        isOpen: isOpen,
        setIsOpen: setIsOpen
      }), /*#__PURE__*/react["createElement"]("span", {
        onClick: toggleIsOpen,
        className: name !== '' ? InspectedElementHooksTree_default.a.Name : InspectedElementHooksTree_default.a.NameAnonymous
      }, hookDisplayName || 'Anonymous'), /*#__PURE__*/react["createElement"]("span", {
        className: InspectedElementHooksTree_default.a.Value,
        onClick: toggleIsOpen
      }, isOpen || getMetaValueLabel(value))), /*#__PURE__*/react["createElement"]("div", {
        className: InspectedElementHooksTree_default.a.Children,
        hidden: !isOpen
      }, /*#__PURE__*/react["createElement"](KeyValue_KeyValue, {
        alphaSort: false,
        bridge: bridge,
        canDeletePaths: canDeletePaths,
        canEditValues: canEditValues,
        canRenamePaths: canRenamePaths,
        canRenamePathsAtDepth: canRenamePathsAtDepth,
        depth: 1,
        element: element,
        hookID: hookID,
        hookName: hookName,
        inspectedElement: inspectedElement,
        name: "DebugValue",
        path: path.concat(['value']),
        pathRoot: "hooks",
        store: store,
        value: value
      }), subHooksView));
    } else {
      return /*#__PURE__*/react["createElement"]("div", {
        className: InspectedElementHooksTree_default.a.Hook
      }, /*#__PURE__*/react["createElement"]("div", {
        ref: contextMenuTriggerRef,
        className: InspectedElementHooksTree_default.a.NameValueRow
      }, /*#__PURE__*/react["createElement"](ExpandCollapseToggle_ExpandCollapseToggle, {
        isOpen: isOpen,
        setIsOpen: setIsOpen
      }), /*#__PURE__*/react["createElement"]("span", {
        onClick: toggleIsOpen,
        className: name !== '' ? InspectedElementHooksTree_default.a.Name : InspectedElementHooksTree_default.a.NameAnonymous
      }, hookDisplayName || 'Anonymous'), ' ', /*#__PURE__*/react["createElement"]("span", {
        className: InspectedElementHooksTree_default.a.Value,
        onClick: toggleIsOpen
      }, displayValue)), /*#__PURE__*/react["createElement"]("div", {
        className: InspectedElementHooksTree_default.a.Children,
        hidden: !isOpen
      }, subHooksView));
    }
  } else {
    if (isComplexDisplayValue) {
      return /*#__PURE__*/react["createElement"]("div", {
        className: InspectedElementHooksTree_default.a.Hook
      }, /*#__PURE__*/react["createElement"](KeyValue_KeyValue, {
        alphaSort: false,
        bridge: bridge,
        canDeletePaths: canDeletePaths,
        canEditValues: canEditValues,
        canRenamePaths: canRenamePaths,
        canRenamePathsAtDepth: canRenamePathsAtDepth,
        depth: 1,
        element: element,
        hookID: hookID,
        hookName: hookName,
        inspectedElement: inspectedElement,
        name: name,
        path: path.concat(['value']),
        pathRoot: "hooks",
        store: store,
        value: value
      }));
    } else {
      return /*#__PURE__*/react["createElement"]("div", {
        className: InspectedElementHooksTree_default.a.Hook
      }, /*#__PURE__*/react["createElement"](KeyValue_KeyValue, {
        alphaSort: false,
        bridge: bridge,
        canDeletePaths: false,
        canEditValues: canEditValues,
        canRenamePaths: false,
        depth: 1,
        element: element,
        hookID: hookID,
        hookName: hookName,
        inspectedElement: inspectedElement,
        name: name,
        path: [],
        pathRoot: "hooks",
        store: store,
        value: value
      }));
    }
  }
}