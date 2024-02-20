function Element_Element({
  data,
  index,
  style
}) {
  const store = Object(react["useContext"])(StoreContext);
  const {
    ownerFlatTree,
    ownerID,
    selectedElementID
  } = Object(react["useContext"])(TreeStateContext);
  const dispatch = Object(react["useContext"])(TreeDispatcherContext);
  const {
    showInlineWarningsAndErrors
  } = react["useContext"](SettingsContext);
  const element = ownerFlatTree !== null ? ownerFlatTree[index] : store.getElementAtIndex(index);
  const [isHovered, setIsHovered] = Object(react["useState"])(false);
  const {
    isNavigatingWithKeyboard,
    onElementMouseEnter,
    treeFocused
  } = data;
  const id = element === null ? null : element.id;
  const isSelected = selectedElementID === id;
  const errorsAndWarningsSubscription = Object(react["useMemo"])(() => ({
    getCurrentValue: () => element === null ? {
      errorCount: 0,
      warningCount: 0
    } : store.getErrorAndWarningCountForElementID(element.id),
    subscribe: callback => {
      store.addListener('mutated', callback);
      return () => store.removeListener('mutated', callback);
    }
  }), [store, element]);
  const {
    errorCount,
    warningCount
  } = useSubscription(errorsAndWarningsSubscription);

  const handleDoubleClick = () => {
    if (id !== null) {
      dispatch({
        type: 'SELECT_OWNER',
        payload: id
      });
    }
  }; // $FlowFixMe[missing-local-annot]


  const handleClick = ({
    metaKey
  }) => {
    if (id !== null) {
      Object(Logger["a" /* logEvent */])({
        event_name: 'select-element',
        metadata: {
          source: 'click-element'
        }
      });
      dispatch({
        type: 'SELECT_ELEMENT_BY_ID',
        payload: metaKey ? null : id
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);

    if (id !== null) {
      onElementMouseEnter(id);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  }; // $FlowFixMe[missing-local-annot]


  const handleKeyDoubleClick = event => {
    // Double clicks on key value are used for text selection (if the text has been truncated).
    // They should not enter the owners tree view.
    event.stopPropagation();
    event.preventDefault();
  }; // Handle elements that are removed from the tree while an async render is in progress.


  if (element == null) {
    console.warn(`<Element> Could not find element at index ${index}`); // This return needs to happen after hooks, since hooks can't be conditional.

    return null;
  }

  const {
    depth,
    displayName,
    hocDisplayNames,
    isStrictModeNonCompliant,
    key,
    type
  } = element; // Only show strict mode non-compliance badges for top level elements.
  // Showing an inline badge for every element in the tree would be noisy.

  const showStrictModeBadge = isStrictModeNonCompliant && depth === 0;
  let className = Element_default.a.Element;

  if (isSelected) {
    className = treeFocused ? Element_default.a.SelectedElement : Element_default.a.InactiveSelectedElement;
  } else if (isHovered && !isNavigatingWithKeyboard) {
    className = Element_default.a.HoveredElement;
  }

  return /*#__PURE__*/react["createElement"]("div", {
    className: className,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    onDoubleClick: handleDoubleClick,
    style: style,
    "data-testname": "ComponentTreeListItem",
    "data-depth": depth
  }, /*#__PURE__*/react["createElement"]("div", {
    className: Element_default.a.Wrapper,
    style: {
      // Left offset presents the appearance of a nested tree structure.
      // We must use padding rather than margin/left because of the selected background color.
      transform: `translateX(calc(${depth} * var(--indentation-size)))`
    }
  }, ownerID === null ? /*#__PURE__*/react["createElement"](ExpandCollapseToggle, {
    element: element,
    store: store
  }) : null, /*#__PURE__*/react["createElement"](DisplayName, {
    displayName: displayName,
    id: id
  }), key && /*#__PURE__*/react["createElement"](react["Fragment"], null, "\xA0", /*#__PURE__*/react["createElement"]("span", {
    className: Element_default.a.KeyName
  }, "key"), "=\"", /*#__PURE__*/react["createElement"]("span", {
    className: Element_default.a.KeyValue,
    title: key,
    onDoubleClick: handleKeyDoubleClick
  }, key), "\""), hocDisplayNames !== null && hocDisplayNames.length > 0 ? /*#__PURE__*/react["createElement"](Badge_Badge, {
    className: Element_default.a.Badge,
    hocDisplayNames: hocDisplayNames,
    type: type
  }, /*#__PURE__*/react["createElement"](DisplayName, {
    displayName: hocDisplayNames[0],
    id: id
  })) : null, showInlineWarningsAndErrors && errorCount > 0 && /*#__PURE__*/react["createElement"](Icon_Icon, {
    type: "error",
    className: isSelected && treeFocused ? Element_default.a.ErrorIconContrast : Element_default.a.ErrorIcon
  }), showInlineWarningsAndErrors && warningCount > 0 && /*#__PURE__*/react["createElement"](Icon_Icon, {
    type: "warning",
    className: isSelected && treeFocused ? Element_default.a.WarningIconContrast : Element_default.a.WarningIcon
  }), showStrictModeBadge && /*#__PURE__*/react["createElement"](Icon_Icon, {
    className: isSelected && treeFocused ? Element_default.a.StrictModeContrast : Element_default.a.StrictMode,
    title: "This component is not running in StrictMode.",
    type: "strict-mode-non-compliant"
  })));
}