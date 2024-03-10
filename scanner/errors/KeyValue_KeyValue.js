function KeyValue_KeyValue({
  alphaSort,
  bridge,
  canDeletePaths,
  canEditValues,
  canRenamePaths,
  canRenamePathsAtDepth,
  depth,
  element,
  inspectedElement,
  isDirectChildOfAnArray,
  hidden,
  hookID,
  hookName,
  name,
  path,
  pathRoot,
  store,
  value
}) {
  const {
    readOnly: readOnlyGlobalFlag
  } = Object(react["useContext"])(OptionsContext);
  canDeletePaths = !readOnlyGlobalFlag && canDeletePaths;
  canEditValues = !readOnlyGlobalFlag && canEditValues;
  canRenamePaths = !readOnlyGlobalFlag && canRenamePaths;
  const {
    id
  } = inspectedElement;
  const [isOpen, setIsOpen] = Object(react["useState"])(false);
  const contextMenuTriggerRef = Object(react["useRef"])(null);
  const {
    inspectPaths
  } = Object(react["useContext"])(InspectedElementContext);
  let isInspectable = false;
  let isReadOnlyBasedOnMetadata = false;

  if (value !== null && typeof value === 'object') {
    isInspectable = value[hydration["d" /* meta */].inspectable] && value[hydration["d" /* meta */].size] !== 0;
    isReadOnlyBasedOnMetadata = value[hydration["d" /* meta */].readonly];
  }

  const [isInspectPathsPending, startInspectPathsTransition] = Object(react["useTransition"])();

  const toggleIsOpen = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);

      if (isInspectable) {
        startInspectPathsTransition(() => {
          inspectPaths([pathRoot, ...path]);
        });
      }
    }
  };

  useContextMenu({
    data: {
      path: [pathRoot, ...path],
      type: value !== null && typeof value === 'object' && KeyValue_hasOwnProperty.call(value, hydration["d" /* meta */].type) ? value[hydration["d" /* meta */].type] : typeof value
    },
    id: 'InspectedElement',
    ref: contextMenuTriggerRef
  });
  const dataType = typeof value;
  const isSimpleType = dataType === 'number' || dataType === 'string' || dataType === 'boolean' || value == null;
  const style = {
    paddingLeft: `${(depth - 1) * 0.75}rem`
  };

  const overrideValue = (newPath, newValue) => {
    if (hookID != null) {
      newPath = parseHookPathForEdit(newPath);
    }

    const rendererID = store.getRendererIDForElement(id);

    if (rendererID !== null) {
      bridge.send('overrideValueAtPath', {
        hookID,
        id,
        path: newPath,
        rendererID,
        type: pathRoot,
        value: newValue
      });
    }
  };

  const deletePath = pathToDelete => {
    if (hookID != null) {
      pathToDelete = parseHookPathForEdit(pathToDelete);
    }

    const rendererID = store.getRendererIDForElement(id);

    if (rendererID !== null) {
      bridge.send('deletePath', {
        hookID,
        id,
        path: pathToDelete,
        rendererID,
        type: pathRoot
      });
    }
  };

  const renamePath = (oldPath, newPath) => {
    if (newPath[newPath.length - 1] === '') {
      // Deleting the key suggests an intent to delete the whole path.
      if (canDeletePaths) {
        deletePath(oldPath);
      }
    } else {
      if (hookID != null) {
        oldPath = parseHookPathForEdit(oldPath);
        newPath = parseHookPathForEdit(newPath);
      }

      const rendererID = store.getRendererIDForElement(id);

      if (rendererID !== null) {
        bridge.send('renamePath', {
          hookID,
          id,
          newPath,
          oldPath,
          rendererID,
          type: pathRoot
        });
      }
    }
  }; // TRICKY This is a bit of a hack to account for context and hooks.
  // In these cases, paths can be renamed but only at certain depths.
  // The special "value" wrapper for context shouldn't be editable.
  // Only certain types of hooks should be editable.


  let canRenameTheCurrentPath = canRenamePaths;

  if (canRenameTheCurrentPath && typeof canRenamePathsAtDepth === 'function') {
    canRenameTheCurrentPath = canRenamePathsAtDepth(depth);
  }

  let renderedName;

  if (isDirectChildOfAnArray) {
    if (canDeletePaths) {
      renderedName = /*#__PURE__*/react["createElement"](DeleteToggle, {
        name: name,
        deletePath: deletePath,
        path: path
      });
    } else {
      renderedName = /*#__PURE__*/react["createElement"]("span", {
        className: KeyValue_default.a.Name
      }, name, !!hookName && /*#__PURE__*/react["createElement"]("span", {
        className: KeyValue_default.a.HookName
      }, "(", hookName, ")"));
    }
  } else if (canRenameTheCurrentPath) {
    renderedName = /*#__PURE__*/react["createElement"](EditableName_EditableName, {
      allowEmpty: canDeletePaths,
      className: KeyValue_default.a.EditableName,
      initialValue: name,
      overrideName: renamePath,
      path: path
    });
  } else {
    renderedName = /*#__PURE__*/react["createElement"]("span", {
      className: KeyValue_default.a.Name,
      "data-testname": "NonEditableName"
    }, name, !!hookName && /*#__PURE__*/react["createElement"]("span", {
      className: KeyValue_default.a.HookName
    }, "(", hookName, ")"));
  }

  let children = null;

  if (isSimpleType) {
    let displayValue = value;

    if (dataType === 'string') {
      displayValue = `"${value}"`;
    } else if (dataType === 'boolean') {
      displayValue = value ? 'true' : 'false';
    } else if (value === null) {
      displayValue = 'null';
    } else if (value === undefined) {
      displayValue = 'undefined';
    }

    let shouldDisplayValueAsLink = false;

    if (dataType === 'string' && PROTOCOLS_SUPPORTED_AS_LINKS_IN_KEY_VALUE.some(protocolPrefix => value.startsWith(protocolPrefix))) {
      shouldDisplayValueAsLink = true;
    }

    children = /*#__PURE__*/react["createElement"]("div", {
      key: "root",
      className: KeyValue_default.a.Item,
      hidden: hidden,
      ref: contextMenuTriggerRef,
      style: style
    }, /*#__PURE__*/react["createElement"]("div", {
      className: KeyValue_default.a.ExpandCollapseToggleSpacer
    }), renderedName, /*#__PURE__*/react["createElement"]("div", {
      className: KeyValue_default.a.AfterName
    }, ":"), canEditValues ? /*#__PURE__*/react["createElement"](EditableValue_EditableValue, {
      overrideValue: overrideValue,
      path: path,
      value: value
    }) : shouldDisplayValueAsLink ? /*#__PURE__*/react["createElement"]("a", {
      className: KeyValue_default.a.Link,
      href: value,
      target: "_blank",
      rel: "noopener noreferrer"
    }, displayValue) : /*#__PURE__*/react["createElement"]("span", {
      className: KeyValue_default.a.Value,
      "data-testname": "NonEditableValue"
    }, displayValue));
  } else if (KeyValue_hasOwnProperty.call(value, hydration["d" /* meta */].type) && !KeyValue_hasOwnProperty.call(value, hydration["d" /* meta */].unserializable)) {
    children = /*#__PURE__*/react["createElement"]("div", {
      key: "root",
      className: KeyValue_default.a.Item,
      hidden: hidden,
      ref: contextMenuTriggerRef,
      style: style
    }, isInspectable ? /*#__PURE__*/react["createElement"](ExpandCollapseToggle_ExpandCollapseToggle, {
      isOpen: isOpen,
      setIsOpen: toggleIsOpen
    }) : /*#__PURE__*/react["createElement"]("div", {
      className: KeyValue_default.a.ExpandCollapseToggleSpacer
    }), renderedName, /*#__PURE__*/react["createElement"]("div", {
      className: KeyValue_default.a.AfterName
    }, ":"), /*#__PURE__*/react["createElement"]("span", {
      className: KeyValue_default.a.Value,
      onClick: isInspectable ? toggleIsOpen : undefined
    }, getMetaValueLabel(value)));

    if (isInspectPathsPending) {
      children = /*#__PURE__*/react["createElement"](react["Fragment"], null, children, /*#__PURE__*/react["createElement"]("div", {
        className: KeyValue_default.a.Item,
        style: style
      }, /*#__PURE__*/react["createElement"]("div", {
        className: KeyValue_default.a.ExpandCollapseToggleSpacer
      }), /*#__PURE__*/react["createElement"](LoadingAnimation_LoadingAnimation, null)));
    }
  } else {
    if (Object(isArray["a" /* default */])(value)) {
      const hasChildren = value.length > 0 || canEditValues;
      const displayName = getMetaValueLabel(value);
      children = value.map((innerValue, index) => /*#__PURE__*/react["createElement"](KeyValue_KeyValue, {
        key: index,
        alphaSort: alphaSort,
        bridge: bridge,
        canDeletePaths: canDeletePaths && !isReadOnlyBasedOnMetadata,
        canEditValues: canEditValues && !isReadOnlyBasedOnMetadata,
        canRenamePaths: canRenamePaths && !isReadOnlyBasedOnMetadata,
        canRenamePathsAtDepth: canRenamePathsAtDepth,
        depth: depth + 1,
        element: element,
        hookID: hookID,
        inspectedElement: inspectedElement,
        isDirectChildOfAnArray: true,
        hidden: hidden || !isOpen,
        name: index,
        path: path.concat(index),
        pathRoot: pathRoot,
        store: store,
        value: value[index]
      }));

      if (canEditValues && !isReadOnlyBasedOnMetadata) {
        children.push( /*#__PURE__*/react["createElement"](NewArrayValue_NewArrayValue, {
          key: "NewKeyValue",
          bridge: bridge,
          depth: depth + 1,
          hidden: hidden || !isOpen,
          hookID: hookID,
          index: value.length,
          element: element,
          inspectedElement: inspectedElement,
          path: path,
          store: store,
          type: pathRoot
        }));
      }

      children.unshift( /*#__PURE__*/react["createElement"]("div", {
        key: `${depth}-root`,
        className: KeyValue_default.a.Item,
        hidden: hidden,
        ref: contextMenuTriggerRef,
        style: style
      }, hasChildren ? /*#__PURE__*/react["createElement"](ExpandCollapseToggle_ExpandCollapseToggle, {
        isOpen: isOpen,
        setIsOpen: setIsOpen
      }) : /*#__PURE__*/react["createElement"]("div", {
        className: KeyValue_default.a.ExpandCollapseToggleSpacer
      }), renderedName, /*#__PURE__*/react["createElement"]("div", {
        className: KeyValue_default.a.AfterName
      }, ":"), /*#__PURE__*/react["createElement"]("span", {
        className: KeyValue_default.a.Value,
        onClick: hasChildren ? toggleIsOpen : undefined
      }, displayName)));
    } else {
      // TRICKY
      // It's important to use Object.entries() rather than Object.keys()
      // because of the hidden meta Symbols used for hydration and unserializable values.
      const entries = Object.entries(value);

      if (alphaSort) {
        entries.sort(alphaSortEntries);
      }

      const hasChildren = entries.length > 0 || canEditValues;
      const displayName = getMetaValueLabel(value);
      children = entries.map(([key, keyValue]) => /*#__PURE__*/react["createElement"](KeyValue_KeyValue, {
        key: key,
        alphaSort: alphaSort,
        bridge: bridge,
        canDeletePaths: canDeletePaths && !isReadOnlyBasedOnMetadata,
        canEditValues: canEditValues && !isReadOnlyBasedOnMetadata,
        canRenamePaths: canRenamePaths && !isReadOnlyBasedOnMetadata,
        canRenamePathsAtDepth: canRenamePathsAtDepth,
        depth: depth + 1,
        element: element,
        hookID: hookID,
        inspectedElement: inspectedElement,
        hidden: hidden || !isOpen,
        name: key,
        path: path.concat(key),
        pathRoot: pathRoot,
        store: store,
        value: keyValue
      }));

      if (canEditValues && !isReadOnlyBasedOnMetadata) {
        children.push( /*#__PURE__*/react["createElement"](NewKeyValue_NewKeyValue, {
          key: "NewKeyValue",
          bridge: bridge,
          depth: depth + 1,
          element: element,
          hidden: hidden || !isOpen,
          hookID: hookID,
          inspectedElement: inspectedElement,
          path: path,
          store: store,
          type: pathRoot
        }));
      }

      children.unshift( /*#__PURE__*/react["createElement"]("div", {
        key: `${depth}-root`,
        className: KeyValue_default.a.Item,
        hidden: hidden,
        ref: contextMenuTriggerRef,
        style: style
      }, hasChildren ? /*#__PURE__*/react["createElement"](ExpandCollapseToggle_ExpandCollapseToggle, {
        isOpen: isOpen,
        setIsOpen: setIsOpen
      }) : /*#__PURE__*/react["createElement"]("div", {
        className: KeyValue_default.a.ExpandCollapseToggleSpacer
      }), renderedName, /*#__PURE__*/react["createElement"]("div", {
        className: KeyValue_default.a.AfterName
      }, ":"), /*#__PURE__*/react["createElement"]("span", {
        className: KeyValue_default.a.Value,
        onClick: hasChildren ? toggleIsOpen : undefined
      }, displayName)));
    }
  }

  return children;
}