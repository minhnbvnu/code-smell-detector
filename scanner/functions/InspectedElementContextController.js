function InspectedElementContextController({
  children
}) {
  const {
    selectedElementID
  } = Object(react["useContext"])(TreeStateContext);
  const fetchFileWithCaching = Object(react["useContext"])(Components_FetchFileWithCachingContext);
  const bridge = Object(react["useContext"])(BridgeContext);
  const store = Object(react["useContext"])(StoreContext);
  const {
    parseHookNames: parseHookNamesByDefault
  } = Object(react["useContext"])(SettingsContext); // parseHookNames has a lot of code.
  // Embedding it into a build makes the build large.
  // This function enables DevTools to make use of Suspense to lazily import() it only if the feature will be used.
  // TODO (Webpack 5) Hopefully we can remove this indirection once the Webpack 5 upgrade is completed.

  const hookNamesModuleLoader = Object(react["useContext"])(Components_HookNamesModuleLoaderContext);
  const refresh = Object(react["unstable_useCacheRefresh"])(); // Temporarily stores most recently-inspected (hydrated) path.
  // The transition that updates this causes the component to re-render and ask the cache->backend for the new path.
  // When a path is sent along with an "inspectElement" request,
  // the backend knows to send its dehydrated data even if the element hasn't updated since the last request.

  const [state, setState] = Object(react["useState"])({
    element: null,
    path: null
  });
  const element = selectedElementID !== null ? store.getElementByID(selectedElementID) : null;
  const alreadyLoadedHookNames = element != null && Object(hookNamesCache["c" /* hasAlreadyLoadedHookNames */])(element); // Parse the currently inspected element's hook names.
  // This may be enabled by default (for all elements)
  // or it may be opted into on a per-element basis (if it's too slow to be on by default).

  const [parseHookNames, setParseHookNames] = Object(react["useState"])(parseHookNamesByDefault || alreadyLoadedHookNames);
  const elementHasChanged = element !== null && element !== state.element; // Reset the cached inspected paths when a new element is selected.

  if (elementHasChanged) {
    setState({
      element,
      path: null
    });
    setParseHookNames(parseHookNamesByDefault || alreadyLoadedHookNames);
  }

  const purgeCachedMetadataRef = Object(react["useRef"])(null); // Don't load a stale element from the backend; it wastes bridge bandwidth.

  let hookNames = null;
  let inspectedElement = null;

  if (!elementHasChanged && element !== null) {
    inspectedElement = inspectedElementCache_inspectElement(element, state.path, store, bridge);

    if (DevToolsFeatureFlags_extension_oss["c" /* enableNamedHooksFeature */]) {
      if (typeof hookNamesModuleLoader === 'function') {
        if (parseHookNames || alreadyLoadedHookNames) {
          const hookNamesModule = loadModule(hookNamesModuleLoader);

          if (hookNamesModule !== null) {
            const {
              parseHookNames: loadHookNamesFunction,
              purgeCachedMetadata
            } = hookNamesModule;
            purgeCachedMetadataRef.current = purgeCachedMetadata;

            if (inspectedElement !== null && inspectedElement.hooks !== null && loadHookNamesFunction !== null) {
              hookNames = Object(hookNamesCache["d" /* loadHookNames */])(element, inspectedElement.hooks, loadHookNamesFunction, fetchFileWithCaching);
            }
          }
        }
      }
    }
  }

  const toggleParseHookNames = Object(react["useCallback"])(() => {
    Object(react["startTransition"])(() => {
      setParseHookNames(value => !value);
      refresh();
    });
  }, [setParseHookNames]);
  const inspectPaths = Object(react["useCallback"])(path => {
    Object(react["startTransition"])(() => {
      setState({
        element: state.element,
        path
      });
      refresh();
    });
  }, [setState, state]);
  const inspectedElementRef = Object(react["useRef"])(null);
  Object(react["useEffect"])(() => {
    if (inspectedElement !== null && inspectedElement.hooks !== null && inspectedElementRef.current !== inspectedElement) {
      inspectedElementRef.current = inspectedElement;
    }
  }, [inspectedElement]);
  Object(react["useEffect"])(() => {
    const purgeCachedMetadata = purgeCachedMetadataRef.current;

    if (typeof purgeCachedMetadata === 'function') {
      // When Fast Refresh updates a component, any cached AST metadata may be invalid.
      const fastRefreshScheduled = () => {
        Object(react["startTransition"])(() => {
          Object(hookNamesCache["a" /* clearHookNamesCache */])();
          purgeCachedMetadata();
          refresh();
        });
      };

      bridge.addListener('fastRefreshScheduled', fastRefreshScheduled);
      return () => bridge.removeListener('fastRefreshScheduled', fastRefreshScheduled);
    }
  }, [bridge]); // Reset path now that we've asked the backend to hydrate it.
  // The backend is stateful, so we don't need to remember this path the next time we inspect.

  Object(react["useEffect"])(() => {
    if (state.path !== null) {
      setState({
        element: state.element,
        path: null
      });
    }
  }, [state]); // Periodically poll the selected element for updates.

  Object(react["useEffect"])(() => {
    if (element !== null) {
      const checkForUpdateWrapper = () => {
        checkForUpdate({
          bridge,
          element,
          refresh,
          store
        });
        timeoutID = setTimeout(checkForUpdateWrapper, POLL_INTERVAL);
      };

      let timeoutID = setTimeout(checkForUpdateWrapper, POLL_INTERVAL);
      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [element, hookNames, // Reset this timer any time the element we're inspecting gets a new response.
  // No sense to ping right away after e.g. inspecting/hydrating a path.
  inspectedElement, state]);
  const value = Object(react["useMemo"])(() => ({
    hookNames,
    inspectedElement,
    inspectPaths,
    parseHookNames,
    toggleParseHookNames
  }), [hookNames, inspectedElement, inspectPaths, parseHookNames, toggleParseHookNames]);
  return /*#__PURE__*/react["createElement"](InspectedElementContext.Provider, {
    value: value
  }, children);
}