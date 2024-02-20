function InspectedElementErrorsAndWarningsTree_InspectedElementErrorsAndWarningsTree({
  bridge,
  inspectedElement,
  store
}) {
  const refresh = Object(react["unstable_useCacheRefresh"])();
  const [isErrorsTransitionPending, startClearErrorsTransition] = Object(react["useTransition"])();

  const clearErrorsForInspectedElement = () => {
    const {
      id
    } = inspectedElement;
    const rendererID = store.getRendererIDForElement(id);

    if (rendererID !== null) {
      startClearErrorsTransition(() => {
        clearErrorsForElement({
          bridge,
          id,
          rendererID
        });
        refresh();
      });
    }
  };

  const [isWarningsTransitionPending, startClearWarningsTransition] = Object(react["useTransition"])();

  const clearWarningsForInspectedElement = () => {
    const {
      id
    } = inspectedElement;
    const rendererID = store.getRendererIDForElement(id);

    if (rendererID !== null) {
      startClearWarningsTransition(() => {
        clearWarningsForElement({
          bridge,
          id,
          rendererID
        });
        refresh();
      });
    }
  };

  const {
    showInlineWarningsAndErrors
  } = Object(react["useContext"])(SettingsContext);

  if (!showInlineWarningsAndErrors) {
    return null;
  }

  const {
    errors,
    warnings
  } = inspectedElement;
  return /*#__PURE__*/react["createElement"](react["Fragment"], null, errors.length > 0 && /*#__PURE__*/react["createElement"](InspectedElementErrorsAndWarningsTree_Tree, {
    badgeClassName: InspectedElementErrorsAndWarningsTree_default.a.ErrorBadge,
    bridge: bridge,
    className: InspectedElementErrorsAndWarningsTree_default.a.ErrorTree,
    clearMessages: clearErrorsForInspectedElement,
    entries: errors,
    isTransitionPending: isErrorsTransitionPending,
    label: "errors",
    messageClassName: InspectedElementErrorsAndWarningsTree_default.a.Error
  }), warnings.length > 0 && /*#__PURE__*/react["createElement"](InspectedElementErrorsAndWarningsTree_Tree, {
    badgeClassName: InspectedElementErrorsAndWarningsTree_default.a.WarningBadge,
    bridge: bridge,
    className: InspectedElementErrorsAndWarningsTree_default.a.WarningTree,
    clearMessages: clearWarningsForInspectedElement,
    entries: warnings,
    isTransitionPending: isWarningsTransitionPending,
    label: "warnings",
    messageClassName: InspectedElementErrorsAndWarningsTree_default.a.Warning
  }));
}