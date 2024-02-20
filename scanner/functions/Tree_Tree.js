function Tree_Tree(props) {
  const dispatch = Object(react["useContext"])(TreeDispatcherContext);
  const {
    numElements,
    ownerID,
    searchIndex,
    searchResults,
    selectedElementID,
    selectedElementIndex
  } = Object(react["useContext"])(TreeStateContext);
  const bridge = Object(react["useContext"])(BridgeContext);
  const store = Object(react["useContext"])(StoreContext);
  const {
    hideSettings
  } = Object(react["useContext"])(OptionsContext);
  const [isNavigatingWithKeyboard, setIsNavigatingWithKeyboard] = Object(react["useState"])(false);
  const {
    highlightNativeElement,
    clearHighlightNativeElement
  } = useHighlightNativeElement();
  const treeRef = Object(react["useRef"])(null);
  const focusTargetRef = Object(react["useRef"])(null);
  const [treeFocused, setTreeFocused] = Object(react["useState"])(false);
  const {
    lineHeight,
    showInlineWarningsAndErrors
  } = Object(react["useContext"])(SettingsContext); // Make sure a newly selected element is visible in the list.
  // This is helpful for things like the owners list and search.
  //
  // TRICKY:
  // It's important to use a callback ref for this, rather than a ref object and an effect.
  // As an optimization, the AutoSizer component does not render children when their size would be 0.
  // This means that in some cases (if the browser panel size is initially really small),
  // the Tree component might render without rendering an inner List.
  // In this case, the list ref would be null on mount (when the scroll effect runs),
  // meaning the scroll action would be skipped (since ref updates don't re-run effects).
  // Using a callback ref accounts for this case...

  const listCallbackRef = Object(react["useCallback"])(list => {
    if (list != null && selectedElementIndex !== null) {
      list.scrollToItem(selectedElementIndex, 'smart');
    }
  }, [selectedElementIndex]); // Picking an element in the inspector should put focus into the tree.
  // This ensures that keyboard navigation works right after picking a node.

  Object(react["useEffect"])(() => {
    function handleStopInspectingNative(didSelectNode) {
      if (didSelectNode && focusTargetRef.current !== null) {
        focusTargetRef.current.focus();
        Object(Logger["a" /* logEvent */])({
          event_name: 'select-element',
          metadata: {
            source: 'inspector'
          }
        });
      }
    }

    bridge.addListener('stopInspectingNative', handleStopInspectingNative);
    return () => bridge.removeListener('stopInspectingNative', handleStopInspectingNative);
  }, [bridge]); // This ref is passed down the context to elements.
  // It lets them avoid autoscrolling to the same item many times
  // when a selected virtual row goes in and out of the viewport.

  const lastScrolledIDRef = Object(react["useRef"])(null); // Navigate the tree with up/down arrow keys.

  Object(react["useEffect"])(() => {
    if (treeRef.current === null) {
      return () => {};
    }

    const handleKeyDown = event => {
      if (event.target.tagName === 'INPUT' || event.defaultPrevented) {
        return;
      }

      let element;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();

          if (event.altKey) {
            dispatch({
              type: 'SELECT_NEXT_SIBLING_IN_TREE'
            });
          } else {
            dispatch({
              type: 'SELECT_NEXT_ELEMENT_IN_TREE'
            });
          }

          break;

        case 'ArrowLeft':
          event.preventDefault();
          element = selectedElementID !== null ? store.getElementByID(selectedElementID) : null;

          if (element !== null) {
            if (event.altKey) {
              if (element.ownerID !== null) {
                dispatch({
                  type: 'SELECT_OWNER_LIST_PREVIOUS_ELEMENT_IN_TREE'
                });
              }
            } else {
              if (element.children.length > 0 && !element.isCollapsed) {
                store.toggleIsCollapsed(element.id, true);
              } else {
                dispatch({
                  type: 'SELECT_PARENT_ELEMENT_IN_TREE'
                });
              }
            }
          }

          break;

        case 'ArrowRight':
          event.preventDefault();
          element = selectedElementID !== null ? store.getElementByID(selectedElementID) : null;

          if (element !== null) {
            if (event.altKey) {
              dispatch({
                type: 'SELECT_OWNER_LIST_NEXT_ELEMENT_IN_TREE'
              });
            } else {
              if (element.children.length > 0 && element.isCollapsed) {
                store.toggleIsCollapsed(element.id, false);
              } else {
                dispatch({
                  type: 'SELECT_CHILD_ELEMENT_IN_TREE'
                });
              }
            }
          }

          break;

        case 'ArrowUp':
          event.preventDefault();

          if (event.altKey) {
            dispatch({
              type: 'SELECT_PREVIOUS_SIBLING_IN_TREE'
            });
          } else {
            dispatch({
              type: 'SELECT_PREVIOUS_ELEMENT_IN_TREE'
            });
          }

          break;

        default:
          return;
      }

      setIsNavigatingWithKeyboard(true);
    }; // We used to listen to at the document level for this event.
    // That allowed us to listen to up/down arrow key events while another section
    // of DevTools (like the search input) was focused.
    // This was a minor UX positive.
    //
    // (We had to use ownerDocument rather than document for this, because the
    // DevTools extension renders the Components and Profiler tabs into portals.)
    //
    // This approach caused a problem though: it meant that a react-devtools-inline
    // instance could steal (and prevent/block) keyboard events from other JavaScript
    // on the page– which could even include other react-devtools-inline instances.
    // This is a potential major UX negative.
    //
    // Given the above trade offs, we now listen on the root of the Tree itself.


    const container = treeRef.current;
    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, selectedElementID, store]); // Focus management.

  const handleBlur = Object(react["useCallback"])(() => setTreeFocused(false), []);
  const handleFocus = Object(react["useCallback"])(() => {
    setTreeFocused(true);

    if (selectedElementIndex === null && numElements > 0) {
      dispatch({
        type: 'SELECT_ELEMENT_AT_INDEX',
        payload: 0
      });
    }
  }, [dispatch, numElements, selectedElementIndex]);
  const handleKeyPress = Object(react["useCallback"])(event => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (selectedElementID !== null) {
          dispatch({
            type: 'SELECT_OWNER',
            payload: selectedElementID
          });
        }

        break;

      default:
        break;
    }
  }, [dispatch, selectedElementID]); // If we switch the selected element while using the keyboard,
  // start highlighting it in the DOM instead of the last hovered node.

  const searchRef = Object(react["useRef"])({
    searchIndex,
    searchResults
  });
  Object(react["useEffect"])(() => {
    let didSelectNewSearchResult = false;

    if (searchRef.current.searchIndex !== searchIndex || searchRef.current.searchResults !== searchResults) {
      searchRef.current.searchIndex = searchIndex;
      searchRef.current.searchResults = searchResults;
      didSelectNewSearchResult = true;
    }

    if (isNavigatingWithKeyboard || didSelectNewSearchResult) {
      if (selectedElementID !== null) {
        highlightNativeElement(selectedElementID);
      } else {
        clearHighlightNativeElement();
      }
    }
  }, [bridge, isNavigatingWithKeyboard, highlightNativeElement, searchIndex, searchResults, selectedElementID]); // Highlight last hovered element.

  const handleElementMouseEnter = Object(react["useCallback"])(id => {
    // Ignore hover while we're navigating with keyboard.
    // This avoids flicker from the hovered nodes under the mouse.
    if (!isNavigatingWithKeyboard) {
      highlightNativeElement(id);
    }
  }, [isNavigatingWithKeyboard, highlightNativeElement]);
  const handleMouseMove = Object(react["useCallback"])(() => {
    // We started using the mouse again.
    // This will enable hover styles in individual rows.
    setIsNavigatingWithKeyboard(false);
  }, []);
  const handleMouseLeave = clearHighlightNativeElement; // Let react-window know to re-render any time the underlying tree data changes.
  // This includes the owner context, since it controls a filtered view of the tree.

  const itemData = Object(react["useMemo"])(() => ({
    numElements,
    isNavigatingWithKeyboard,
    onElementMouseEnter: handleElementMouseEnter,
    lastScrolledIDRef,
    treeFocused
  }), [numElements, isNavigatingWithKeyboard, handleElementMouseEnter, lastScrolledIDRef, treeFocused]);
  const itemKey = Object(react["useCallback"])(index => store.getElementIDAtIndex(index), [store]);
  const handlePreviousErrorOrWarningClick = react["useCallback"](() => {
    dispatch({
      type: 'SELECT_PREVIOUS_ELEMENT_WITH_ERROR_OR_WARNING_IN_TREE'
    });
  }, []);
  const handleNextErrorOrWarningClick = react["useCallback"](() => {
    dispatch({
      type: 'SELECT_NEXT_ELEMENT_WITH_ERROR_OR_WARNING_IN_TREE'
    });
  }, []);
  const errorsOrWarningsSubscription = Object(react["useMemo"])(() => ({
    getCurrentValue: () => ({
      errors: store.errorCount,
      warnings: store.warningCount
    }),
    subscribe: callback => {
      store.addListener('mutated', callback);
      return () => store.removeListener('mutated', callback);
    }
  }), [store]);
  const {
    errors,
    warnings
  } = useSubscription(errorsOrWarningsSubscription);

  const clearErrorsAndWarnings = () => {
    backendAPI_clearErrorsAndWarnings({
      bridge,
      store
    });
  };

  const zeroElementsNotice = /*#__PURE__*/react["createElement"]("div", {
    className: Tree_default.a.ZeroElementsNotice
  }, /*#__PURE__*/react["createElement"]("p", null, "Loading React Element Tree..."), /*#__PURE__*/react["createElement"]("p", null, "If this seems stuck, please follow the", ' ', /*#__PURE__*/react["createElement"]("a", {
    className: Tree_default.a.Link,
    href: "https://github.com/facebook/react/tree/main/packages/react-devtools#the-issue-with-chrome-v101-and-earlier-versions",
    target: "_blank"
  }, "troubleshooting instructions"), "."));
  return /*#__PURE__*/react["createElement"](Components_TreeFocusedContext.Provider, {
    value: treeFocused
  }, /*#__PURE__*/react["createElement"]("div", {
    className: Tree_default.a.Tree,
    ref: treeRef
  }, /*#__PURE__*/react["createElement"]("div", {
    className: Tree_default.a.SearchInput
  }, store.supportsNativeInspection && /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"](InspectHostNodesToggle, null), /*#__PURE__*/react["createElement"]("div", {
    className: Tree_default.a.VRule
  })), /*#__PURE__*/react["createElement"](react["Suspense"], {
    fallback: /*#__PURE__*/react["createElement"](Loading, null)
  }, ownerID !== null ? /*#__PURE__*/react["createElement"](OwnerStack, null) : /*#__PURE__*/react["createElement"](ComponentSearchInput, null)), showInlineWarningsAndErrors && ownerID === null && (errors > 0 || warnings > 0) && /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", {
    className: Tree_default.a.VRule
  }), errors > 0 && /*#__PURE__*/react["createElement"]("div", {
    className: Tree_default.a.IconAndCount
  }, /*#__PURE__*/react["createElement"](Icon_Icon, {
    className: Tree_default.a.ErrorIcon,
    type: "error"
  }), errors), warnings > 0 && /*#__PURE__*/react["createElement"]("div", {
    className: Tree_default.a.IconAndCount
  }, /*#__PURE__*/react["createElement"](Icon_Icon, {
    className: Tree_default.a.WarningIcon,
    type: "warning"
  }), warnings), /*#__PURE__*/react["createElement"](Button_Button, {
    onClick: handlePreviousErrorOrWarningClick,
    title: "Scroll to previous error or warning"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "up"
  })), /*#__PURE__*/react["createElement"](Button_Button, {
    onClick: handleNextErrorOrWarningClick,
    title: "Scroll to next error or warning"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "down"
  })), /*#__PURE__*/react["createElement"](Button_Button, {
    onClick: clearErrorsAndWarnings,
    title: "Clear all errors and warnings"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "clear"
  }))), !hideSettings && /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", {
    className: Tree_default.a.VRule
  }), /*#__PURE__*/react["createElement"](SettingsModalContextToggle, null))), numElements === 0 ? zeroElementsNotice : /*#__PURE__*/react["createElement"]("div", {
    className: Tree_default.a.AutoSizerWrapper,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onKeyPress: handleKeyPress,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    ref: focusTargetRef,
    tabIndex: 0
  }, /*#__PURE__*/react["createElement"](index_esm["a" /* default */], null, ({
    height,
    width
  }) => /*#__PURE__*/react["createElement"](FixedSizeList, {
    className: Tree_default.a.List,
    height: height,
    innerElementType: InnerElementType,
    itemCount: numElements,
    itemData: itemData,
    itemKey: itemKey,
    itemSize: lineHeight,
    ref: listCallbackRef,
    width: width
  }, Element_Element)))));
}