function DevTools_DevTools({
  bridge,
  browserTheme = 'light',
  canViewElementSourceFunction,
  componentsPortalContainer,
  defaultTab = 'components',
  enabledInspectedElementContextMenu = false,
  fetchFileWithCaching,
  hookNamesModuleLoaderFunction,
  overrideTab,
  profilerPortalContainer,
  showTabBar = false,
  store,
  warnIfLegacyBackendDetected = false,
  warnIfUnsupportedVersionDetected = false,
  viewAttributeSourceFunction,
  viewElementSourceFunction,
  viewUrlSourceFunction,
  readOnly,
  hideSettings,
  hideToggleErrorAction,
  hideToggleSuspenseAction,
  hideLogAction,
  hideViewSourceAction
}) {
  const [currentTab, setTab] = useLocalStorage(constants["i" /* LOCAL_STORAGE_DEFAULT_TAB_KEY */], defaultTab);
  let tab = currentTab;

  if (overrideTab != null) {
    tab = overrideTab;
  }

  const selectTab = Object(react["useCallback"])(tabId => {
    // We show the TabBar when DevTools is NOT rendered as a browser extension.
    // In this case, we want to capture when people select tabs with the TabBar.
    // When DevTools is rendered as an extension, we capture this event when
    // the browser devtools panel changes.
    if (showTabBar === true) {
      if (tabId === 'components') {
        Object(Logger["a" /* logEvent */])({
          event_name: 'selected-components-tab'
        });
      } else {
        Object(Logger["a" /* logEvent */])({
          event_name: 'selected-profiler-tab'
        });
      }
    }

    setTab(tabId);
  }, [setTab, showTabBar]);
  const options = Object(react["useMemo"])(() => ({
    readOnly: readOnly || false,
    hideSettings: hideSettings || false,
    hideToggleErrorAction: hideToggleErrorAction || false,
    hideToggleSuspenseAction: hideToggleSuspenseAction || false,
    hideLogAction: hideLogAction || false,
    hideViewSourceAction: hideViewSourceAction || false
  }), [readOnly, hideSettings, hideToggleErrorAction, hideToggleSuspenseAction, hideLogAction, hideViewSourceAction]);
  const viewElementSource = Object(react["useMemo"])(() => ({
    canViewElementSourceFunction: canViewElementSourceFunction || null,
    viewElementSourceFunction: viewElementSourceFunction || null
  }), [canViewElementSourceFunction, viewElementSourceFunction]);
  const viewSource = Object(react["useMemo"])(() => ({
    viewUrlSourceFunction: viewUrlSourceFunction || null // todo(blakef): Add inspect(...) method here and remove viewElementSource
    // to consolidate source code inspection.

  }), [viewUrlSourceFunction]);
  const contextMenu = Object(react["useMemo"])(() => ({
    isEnabledForInspectedElement: enabledInspectedElementContextMenu,
    viewAttributeSourceFunction: viewAttributeSourceFunction || null
  }), [enabledInspectedElementContextMenu, viewAttributeSourceFunction]);
  const devToolsRef = Object(react["useRef"])(null);
  Object(react["useEffect"])(() => {
    if (!showTabBar) {
      return;
    }

    const div = devToolsRef.current;

    if (div === null) {
      return;
    }

    const ownerWindow = div.ownerDocument.defaultView;

    const handleKeyDown = event => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case '1':
            selectTab(DevTools_tabs[0].id);
            event.preventDefault();
            event.stopPropagation();
            break;

          case '2':
            selectTab(DevTools_tabs[1].id);
            event.preventDefault();
            event.stopPropagation();
            break;
        }
      }
    };

    ownerWindow.addEventListener('keydown', handleKeyDown);
    return () => {
      ownerWindow.removeEventListener('keydown', handleKeyDown);
    };
  }, [showTabBar]);
  Object(react["useLayoutEffect"])(() => {
    return () => {
      try {
        // Shut the Bridge down synchronously (during unmount).
        bridge.shutdown();
      } catch (error) {// Attempting to use a disconnected port.
      }
    };
  }, [bridge]);
  Object(react["useEffect"])(() => {
    Object(Logger["a" /* logEvent */])({
      event_name: 'loaded-dev-tools'
    });
  }, []);
  return /*#__PURE__*/react["createElement"](BridgeContext.Provider, {
    value: bridge
  }, /*#__PURE__*/react["createElement"](StoreContext.Provider, {
    value: store
  }, /*#__PURE__*/react["createElement"](OptionsContext.Provider, {
    value: options
  }, /*#__PURE__*/react["createElement"](ContextMenuContext.Provider, {
    value: contextMenu
  }, /*#__PURE__*/react["createElement"](ModalDialogContextController, null, /*#__PURE__*/react["createElement"](SettingsContextController, {
    browserTheme: browserTheme,
    componentsPortalContainer: componentsPortalContainer,
    profilerPortalContainer: profilerPortalContainer
  }, /*#__PURE__*/react["createElement"](Components_ViewElementSourceContext.Provider, {
    value: viewElementSource
  }, /*#__PURE__*/react["createElement"](Components_ViewSourceContext.Provider, {
    value: viewSource
  }, /*#__PURE__*/react["createElement"](Components_HookNamesModuleLoaderContext.Provider, {
    value: hookNamesModuleLoaderFunction || null
  }, /*#__PURE__*/react["createElement"](Components_FetchFileWithCachingContext.Provider, {
    value: fetchFileWithCaching || null
  }, /*#__PURE__*/react["createElement"](TreeContextController, null, /*#__PURE__*/react["createElement"](ProfilerContextController, null, /*#__PURE__*/react["createElement"](TimelineContextController, null, /*#__PURE__*/react["createElement"](ThemeProvider, null, /*#__PURE__*/react["createElement"]("div", {
    className: DevTools_default.a.DevTools,
    ref: devToolsRef,
    "data-react-devtools-portal-root": true
  }, showTabBar && /*#__PURE__*/react["createElement"]("div", {
    className: DevTools_default.a.TabBar
  }, /*#__PURE__*/react["createElement"](ReactLogo_ReactLogo, null), /*#__PURE__*/react["createElement"]("span", {
    className: DevTools_default.a.DevToolsVersion
  }, "4.27.1-f7d56173f"), /*#__PURE__*/react["createElement"]("div", {
    className: DevTools_default.a.Spacer
  }), /*#__PURE__*/react["createElement"](TabBar_TabBar, {
    currentTab: tab,
    id: "DevTools",
    selectTab: selectTab,
    tabs: DevTools_tabs,
    type: "navigation"
  })), /*#__PURE__*/react["createElement"]("div", {
    className: DevTools_default.a.TabContent,
    hidden: tab !== 'components'
  }, /*#__PURE__*/react["createElement"](views_Components_Components, {
    portalContainer: componentsPortalContainer
  })), /*#__PURE__*/react["createElement"]("div", {
    className: DevTools_default.a.TabContent,
    hidden: tab !== 'profiler'
  }, /*#__PURE__*/react["createElement"](views_Profiler_Profiler, {
    portalContainer: profilerPortalContainer
  })))))))))))), /*#__PURE__*/react["createElement"](UnsupportedBridgeProtocolDialog_UnsupportedBridgeProtocolDialog, null), warnIfLegacyBackendDetected && /*#__PURE__*/react["createElement"](WarnIfLegacyBackendDetected_WarnIfLegacyBackendDetected, null), warnIfUnsupportedVersionDetected && /*#__PURE__*/react["createElement"](UnsupportedVersionDialog_UnsupportedVersionDialog, null))))));
}