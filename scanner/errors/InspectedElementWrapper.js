function InspectedElementWrapper(_) {
  const {
    inspectedElementID
  } = Object(react["useContext"])(TreeStateContext);
  const dispatch = Object(react["useContext"])(TreeDispatcherContext);
  const {
    canViewElementSourceFunction,
    viewElementSourceFunction
  } = Object(react["useContext"])(Components_ViewElementSourceContext);
  const bridge = Object(react["useContext"])(BridgeContext);
  const store = Object(react["useContext"])(StoreContext);
  const {
    hideToggleErrorAction,
    hideToggleSuspenseAction,
    hideLogAction,
    hideViewSourceAction
  } = Object(react["useContext"])(OptionsContext);
  const {
    dispatch: modalDialogDispatch
  } = Object(react["useContext"])(ModalDialogContext);
  const {
    hookNames,
    inspectedElement,
    parseHookNames,
    toggleParseHookNames
  } = Object(react["useContext"])(InspectedElementContext);
  const element = inspectedElementID !== null ? store.getElementByID(inspectedElementID) : null;
  const highlightElement = Object(react["useCallback"])(() => {
    if (element !== null && inspectedElementID !== null) {
      const rendererID = store.getRendererIDForElement(inspectedElementID);

      if (rendererID !== null) {
        bridge.send('highlightNativeElement', {
          displayName: element.displayName,
          hideAfterTimeout: true,
          id: inspectedElementID,
          openNativeElementsPanel: true,
          rendererID,
          scrollIntoView: true
        });
      }
    }
  }, [bridge, element, inspectedElementID, store]);
  const logElement = Object(react["useCallback"])(() => {
    if (inspectedElementID !== null) {
      const rendererID = store.getRendererIDForElement(inspectedElementID);

      if (rendererID !== null) {
        bridge.send('logElementToConsole', {
          id: inspectedElementID,
          rendererID
        });
      }
    }
  }, [bridge, inspectedElementID, store]);
  const viewSource = Object(react["useCallback"])(() => {
    if (viewElementSourceFunction != null && inspectedElement !== null) {
      viewElementSourceFunction(inspectedElement.id, inspectedElement);
    }
  }, [inspectedElement, viewElementSourceFunction]); // In some cases (e.g. FB internal usage) the standalone shell might not be able to view the source.
  // To detect this case, we defer to an injected helper function (if present).

  const canViewSource = inspectedElement !== null && inspectedElement.canViewSource && viewElementSourceFunction !== null && (canViewElementSourceFunction === null || canViewElementSourceFunction(inspectedElement));
  const isErrored = inspectedElement != null && inspectedElement.isErrored;
  const targetErrorBoundaryID = inspectedElement != null ? inspectedElement.targetErrorBoundaryID : null;
  const isSuspended = element !== null && element.type === types["n" /* ElementTypeSuspense */] && inspectedElement != null && inspectedElement.state != null;
  const canToggleError = !hideToggleErrorAction && inspectedElement != null && inspectedElement.canToggleError;
  const canToggleSuspense = !hideToggleSuspenseAction && inspectedElement != null && inspectedElement.canToggleSuspense;
  const editorURL = Object(react["useSyncExternalStore"])(function subscribe(callback) {
    window.addEventListener(constants["k" /* LOCAL_STORAGE_OPEN_IN_EDITOR_URL */], callback);
    return function unsubscribe() {
      window.removeEventListener(constants["k" /* LOCAL_STORAGE_OPEN_IN_EDITOR_URL */], callback);
    };
  }, function getState() {
    return Object(utils["o" /* getOpenInEditorURL */])();
  });
  const canOpenInEditor = editorURL && inspectedElement != null && inspectedElement.source != null;
  const toggleErrored = Object(react["useCallback"])(() => {
    if (inspectedElement == null || targetErrorBoundaryID == null) {
      return;
    }

    const rendererID = store.getRendererIDForElement(targetErrorBoundaryID);

    if (rendererID !== null) {
      if (targetErrorBoundaryID !== inspectedElement.id) {
        // Update tree selection so that if we cause a component to error,
        // the nearest error boundary will become the newly selected thing.
        dispatch({
          type: 'SELECT_ELEMENT_BY_ID',
          payload: targetErrorBoundaryID
        });
      } // Toggle error.


      bridge.send('overrideError', {
        id: targetErrorBoundaryID,
        rendererID,
        forceError: !isErrored
      });
    }
  }, [bridge, dispatch, isErrored, targetErrorBoundaryID]); // TODO (suspense toggle) Would be nice to eventually use a two setState pattern here as well.

  const toggleSuspended = Object(react["useCallback"])(() => {
    let nearestSuspenseElement = null;
    let currentElement = element;

    while (currentElement !== null) {
      if (currentElement.type === types["n" /* ElementTypeSuspense */]) {
        nearestSuspenseElement = currentElement;
        break;
      } else if (currentElement.parentID > 0) {
        currentElement = store.getElementByID(currentElement.parentID);
      } else {
        currentElement = null;
      }
    } // If we didn't find a Suspense ancestor, we can't suspend.
    // Instead we can show a warning to the user.


    if (nearestSuspenseElement === null) {
      modalDialogDispatch({
        id: 'InspectedElement',
        type: 'SHOW',
        content: /*#__PURE__*/react["createElement"](CannotSuspendWarningMessage, null)
      });
    } else {
      const nearestSuspenseElementID = nearestSuspenseElement.id; // If we're suspending from an arbitrary (non-Suspense) component, select the nearest Suspense element in the Tree.
      // This way when the fallback UI is shown and the current element is hidden, something meaningful is selected.

      if (nearestSuspenseElement !== element) {
        dispatch({
          type: 'SELECT_ELEMENT_BY_ID',
          payload: nearestSuspenseElementID
        });
      }

      const rendererID = store.getRendererIDForElement(nearestSuspenseElementID); // Toggle suspended

      if (rendererID !== null) {
        bridge.send('overrideSuspense', {
          id: nearestSuspenseElementID,
          rendererID,
          forceFallback: !isSuspended
        });
      }
    }
  }, [bridge, dispatch, element, isSuspended, modalDialogDispatch, store]);
  const onOpenInEditor = Object(react["useCallback"])(() => {
    const source = inspectedElement === null || inspectedElement === void 0 ? void 0 : inspectedElement.source;

    if (source == null || editorURL == null) {
      return;
    }

    const url = new URL(editorURL);
    url.href = url.href.replace('{path}', source.fileName);
    url.href = url.href.replace('{line}', String(source.lineNumber));
    window.open(url);
  }, [inspectedElement, editorURL]);

  if (element === null) {
    return /*#__PURE__*/react["createElement"]("div", {
      className: InspectedElement_default.a.InspectedElement
    }, /*#__PURE__*/react["createElement"]("div", {
      className: InspectedElement_default.a.TitleRow
    }));
  }

  let strictModeBadge = null;

  if (element.isStrictModeNonCompliant) {
    strictModeBadge = /*#__PURE__*/react["createElement"]("a", {
      className: InspectedElement_default.a.StrictModeNonCompliant,
      href: "https://fb.me/devtools-strict-mode",
      rel: "noopener noreferrer",
      target: "_blank",
      title: "This component is not running in StrictMode. Click to learn more."
    }, /*#__PURE__*/react["createElement"](Icon_Icon, {
      type: "strict-mode-non-compliant"
    }));
  }

  return /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElement_default.a.InspectedElement
  }, /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElement_default.a.TitleRow,
    "data-testname": "InspectedElement-Title"
  }, strictModeBadge, element.key && /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElement_default.a.Key,
    title: `key "${element.key}"`
  }, element.key), /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElement_default.a.KeyArrow
  })), /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElement_default.a.SelectedComponentName
  }, /*#__PURE__*/react["createElement"]("div", {
    className: element.isStrictModeNonCompliant ? InspectedElement_default.a.StrictModeNonCompliantComponent : InspectedElement_default.a.Component,
    title: element.displayName
  }, element.displayName)), canOpenInEditor && /*#__PURE__*/react["createElement"](Button_Button, {
    className: InspectedElement_default.a.IconButton,
    onClick: onOpenInEditor,
    title: "Open in editor"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "editor"
  })), canToggleError && /*#__PURE__*/react["createElement"](Toggle_Toggle, {
    className: InspectedElement_default.a.IconButton,
    isChecked: isErrored,
    onChange: toggleErrored,
    title: isErrored ? 'Clear the forced error' : 'Force the selected component into an errored state'
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "error"
  })), canToggleSuspense && /*#__PURE__*/react["createElement"](Toggle_Toggle, {
    className: InspectedElement_default.a.IconButton,
    isChecked: isSuspended,
    onChange: toggleSuspended,
    title: isSuspended ? 'Unsuspend the selected component' : 'Suspend the selected component'
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "suspend"
  })), store.supportsNativeInspection && /*#__PURE__*/react["createElement"](Button_Button, {
    className: InspectedElement_default.a.IconButton,
    onClick: highlightElement,
    title: "Inspect the matching DOM element"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "view-dom"
  })), !hideLogAction && /*#__PURE__*/react["createElement"](Button_Button, {
    className: InspectedElement_default.a.IconButton,
    onClick: logElement,
    title: "Log this component data to the console"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "log-data"
  })), !hideViewSourceAction && /*#__PURE__*/react["createElement"](Button_Button, {
    className: InspectedElement_default.a.IconButton,
    disabled: !canViewSource,
    onClick: viewSource,
    title: "View source for this element"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "view-source"
  }))), inspectedElement === null && /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElement_default.a.Loading
  }, "Loading..."), inspectedElement !== null && /*#__PURE__*/react["createElement"](InspectedElementView_InspectedElementView, {
    key: inspectedElementID
    /* Force reset when selected Element changes */
    ,
    element: element,
    hookNames: hookNames,
    inspectedElement: inspectedElement,
    parseHookNames: parseHookNames,
    toggleParseHookNames: toggleParseHookNames
  }));
}