function InspectedElementView_InspectedElementView({
  element,
  hookNames,
  inspectedElement,
  parseHookNames,
  toggleParseHookNames
}) {
  const {
    id
  } = element;
  const {
    owners,
    rendererPackageName,
    rendererVersion,
    rootType,
    source
  } = inspectedElement;
  const bridge = Object(react["useContext"])(BridgeContext);
  const store = Object(react["useContext"])(StoreContext);
  const {
    isEnabledForInspectedElement: isContextMenuEnabledForInspectedElement,
    viewAttributeSourceFunction
  } = Object(react["useContext"])(ContextMenuContext);
  const rendererLabel = rendererPackageName !== null && rendererVersion !== null ? `${rendererPackageName}@${rendererVersion}` : null;
  const showOwnersList = owners !== null && owners.length > 0;
  const showRenderedBy = showOwnersList || rendererLabel !== null || rootType !== null;
  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementView_default.a.InspectedElement
  }, /*#__PURE__*/react["createElement"](HocBadges_HocBadges, {
    element: element
  }), /*#__PURE__*/react["createElement"](InspectedElementPropsTree, {
    bridge: bridge,
    element: element,
    inspectedElement: inspectedElement,
    store: store
  }), /*#__PURE__*/react["createElement"](InspectedElementSuspenseToggle, {
    bridge: bridge,
    inspectedElement: inspectedElement,
    store: store
  }), /*#__PURE__*/react["createElement"](InspectedElementStateTree, {
    bridge: bridge,
    element: element,
    inspectedElement: inspectedElement,
    store: store
  }), /*#__PURE__*/react["createElement"](Components_InspectedElementHooksTree, {
    bridge: bridge,
    element: element,
    hookNames: hookNames,
    inspectedElement: inspectedElement,
    parseHookNames: parseHookNames,
    store: store,
    toggleParseHookNames: toggleParseHookNames
  }), /*#__PURE__*/react["createElement"](InspectedElementContextTree, {
    bridge: bridge,
    element: element,
    inspectedElement: inspectedElement,
    store: store
  }), DevToolsFeatureFlags_extension_oss["f" /* enableStyleXFeatures */] && /*#__PURE__*/react["createElement"](InspectedElementStyleXPlugin_InspectedElementStyleXPlugin, {
    bridge: bridge,
    element: element,
    inspectedElement: inspectedElement,
    store: store
  }), /*#__PURE__*/react["createElement"](InspectedElementErrorsAndWarningsTree_InspectedElementErrorsAndWarningsTree, {
    bridge: bridge,
    element: element,
    inspectedElement: inspectedElement,
    store: store
  }), /*#__PURE__*/react["createElement"](NativeStyleEditorWrapper, null), showRenderedBy && /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementView_default.a.Owners,
    "data-testname": "InspectedElementView-Owners"
  }, /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementView_default.a.OwnersHeader
  }, "rendered by"), showOwnersList && owners.map(owner => /*#__PURE__*/react["createElement"](OwnerView, {
    key: owner.id,
    displayName: owner.displayName || 'Anonymous',
    hocDisplayNames: owner.hocDisplayNames,
    id: owner.id,
    isInStore: store.containsElement(owner.id),
    type: owner.type
  })), rootType !== null && /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementView_default.a.OwnersMetaField
  }, rootType), rendererLabel !== null && /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementView_default.a.OwnersMetaField
  }, rendererLabel)), source !== null && /*#__PURE__*/react["createElement"](Source, {
    fileName: source.fileName,
    lineNumber: source.lineNumber
  })), isContextMenuEnabledForInspectedElement && /*#__PURE__*/react["createElement"](ContextMenu_ContextMenu, {
    id: "InspectedElement"
  }, ({
    path,
    type: pathType
  }) => {
    const copyInspectedElementPath = () => {
      const rendererID = store.getRendererIDForElement(id);

      if (rendererID !== null) {
        backendAPI_copyInspectedElementPath({
          bridge,
          id,
          path,
          rendererID
        });
      }
    };

    const storeAsGlobal = () => {
      const rendererID = store.getRendererIDForElement(id);

      if (rendererID !== null) {
        backendAPI_storeAsGlobal({
          bridge,
          id,
          path,
          rendererID
        });
      }
    };

    return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"](ContextMenuItem_ContextMenuItem, {
      onClick: copyInspectedElementPath,
      title: "Copy value to clipboard"
    }, /*#__PURE__*/react["createElement"](Icon_Icon, {
      className: InspectedElementView_default.a.ContextMenuIcon,
      type: "copy"
    }), " Copy value to clipboard"), /*#__PURE__*/react["createElement"](ContextMenuItem_ContextMenuItem, {
      onClick: storeAsGlobal,
      title: "Store as global variable"
    }, /*#__PURE__*/react["createElement"](Icon_Icon, {
      className: InspectedElementView_default.a.ContextMenuIcon,
      type: "store-as-global-variable"
    }), ' ', "Store as global variable"), viewAttributeSourceFunction !== null && pathType === 'function' && /*#__PURE__*/react["createElement"](ContextMenuItem_ContextMenuItem, {
      onClick: () => viewAttributeSourceFunction(id, path),
      title: "Go to definition"
    }, /*#__PURE__*/react["createElement"](Icon_Icon, {
      className: InspectedElementView_default.a.ContextMenuIcon,
      type: "code"
    }), " Go to definition"));
  }));
}