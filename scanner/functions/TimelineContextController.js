function TimelineContextController({
  children
}) {
  const searchInputContainerRef = Object(react["useRef"])(null);
  const [file, setFile] = Object(react["useState"])(null);
  const store = Object(react["useContext"])(StoreContext);
  const isTimelineSupported = Object(react["useSyncExternalStore"])(function subscribe(callback) {
    store.addListener('rootSupportsTimelineProfiling', callback);
    return function unsubscribe() {
      store.removeListener('rootSupportsTimelineProfiling', callback);
    };
  }, function getState() {
    return store.rootSupportsTimelineProfiling;
  });
  const inMemoryTimelineData = Object(react["useSyncExternalStore"])(function subscribe(callback) {
    store.profilerStore.addListener('isProcessingData', callback);
    store.profilerStore.addListener('profilingData', callback);
    return function unsubscribe() {
      store.profilerStore.removeListener('isProcessingData', callback);
      store.profilerStore.removeListener('profilingData', callback);
    };
  }, function getState() {
    var _store$profilerStore$;

    return ((_store$profilerStore$ = store.profilerStore.profilingData) === null || _store$profilerStore$ === void 0 ? void 0 : _store$profilerStore$.timelineData) || null;
  }); // Recreate view state any time new profiling data is imported.

  const viewState = Object(react["useMemo"])(() => {
    const horizontalScrollStateChangeCallbacks = new Set();
    const searchRegExpStateChangeCallbacks = new Set();
    const horizontalScrollState = {
      offset: 0,
      length: 0
    };
    const state = {
      horizontalScrollState,
      onHorizontalScrollStateChange: callback => {
        horizontalScrollStateChangeCallbacks.add(callback);
      },
      onSearchRegExpStateChange: callback => {
        searchRegExpStateChangeCallbacks.add(callback);
      },
      searchRegExp: null,
      updateHorizontalScrollState: scrollState => {
        if (horizontalScrollState.offset === scrollState.offset && horizontalScrollState.length === scrollState.length) {
          return;
        }

        horizontalScrollState.offset = scrollState.offset;
        horizontalScrollState.length = scrollState.length;
        horizontalScrollStateChangeCallbacks.forEach(callback => {
          callback(scrollState);
        });
      },
      updateSearchRegExpState: searchRegExp => {
        state.searchRegExp = searchRegExp;
        searchRegExpStateChangeCallbacks.forEach(callback => {
          callback(searchRegExp);
        });
      },
      viewToMutableViewStateMap: new Map()
    };
    return state;
  }, [file]);
  const [selectedEvent, selectEvent] = Object(react["useState"])(null);
  const value = Object(react["useMemo"])(() => ({
    file,
    inMemoryTimelineData,
    isTimelineSupported,
    searchInputContainerRef,
    setFile,
    viewState,
    selectEvent,
    selectedEvent
  }), [file, inMemoryTimelineData, isTimelineSupported, setFile, viewState, selectEvent, selectedEvent]);
  return /*#__PURE__*/react["createElement"](TimelineContext.Provider, {
    value: value
  }, children);
}