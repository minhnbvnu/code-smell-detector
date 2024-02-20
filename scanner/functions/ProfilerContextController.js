function ProfilerContextController({
  children
}) {
  const store = Object(react["useContext"])(StoreContext);
  const {
    selectedElementID
  } = Object(react["useContext"])(TreeStateContext);
  const dispatch = Object(react["useContext"])(TreeDispatcherContext);
  const {
    profilerStore
  } = store;
  const subscription = Object(react["useMemo"])(() => ({
    getCurrentValue: () => ({
      didRecordCommits: profilerStore.didRecordCommits,
      isProcessingData: profilerStore.isProcessingData,
      isProfiling: profilerStore.isProfiling,
      profilingData: profilerStore.profilingData,
      supportsProfiling: store.rootSupportsBasicProfiling
    }),
    subscribe: callback => {
      profilerStore.addListener('profilingData', callback);
      profilerStore.addListener('isProcessingData', callback);
      profilerStore.addListener('isProfiling', callback);
      store.addListener('rootSupportsBasicProfiling', callback);
      return () => {
        profilerStore.removeListener('profilingData', callback);
        profilerStore.removeListener('isProcessingData', callback);
        profilerStore.removeListener('isProfiling', callback);
        store.removeListener('rootSupportsBasicProfiling', callback);
      };
    }
  }), [profilerStore, store]);
  const {
    didRecordCommits,
    isProcessingData,
    isProfiling,
    profilingData,
    supportsProfiling
  } = useSubscription(subscription);
  const [prevProfilingData, setPrevProfilingData] = Object(react["useState"])(null);
  const [rootID, setRootID] = Object(react["useState"])(null);
  const [selectedFiberID, selectFiberID] = Object(react["useState"])(null);
  const [selectedFiberName, selectFiberName] = Object(react["useState"])(null);
  const selectFiber = Object(react["useCallback"])((id, name) => {
    selectFiberID(id);
    selectFiberName(name); // Sync selection to the Components tab for convenience.
    // Keep in mind that profiling data may be from a previous session.
    // If data has been imported, we should skip the selection sync.

    if (id !== null && profilingData !== null && profilingData.imported === false) {
      // We should still check to see if this element is still in the store.
      // It may have been removed during profiling.
      if (store.containsElement(id)) {
        dispatch({
          type: 'SELECT_ELEMENT_BY_ID',
          payload: id
        });
      }
    }
  }, [dispatch, selectFiberID, selectFiberName, store, profilingData]);
  const setRootIDAndClearFiber = Object(react["useCallback"])(id => {
    selectFiber(null, null);
    setRootID(id);
  }, [setRootID, selectFiber]);

  if (prevProfilingData !== profilingData) {
    Object(react_dom["unstable_batchedUpdates"])(() => {
      setPrevProfilingData(profilingData);
      const dataForRoots = profilingData !== null ? profilingData.dataForRoots : null;

      if (dataForRoots != null) {
        const firstRootID = dataForRoots.keys().next().value || null;

        if (rootID === null || !dataForRoots.has(rootID)) {
          let selectedElementRootID = null;

          if (selectedElementID !== null) {
            selectedElementRootID = store.getRootIDForElement(selectedElementID);
          }

          if (selectedElementRootID !== null && dataForRoots.has(selectedElementRootID)) {
            setRootIDAndClearFiber(selectedElementRootID);
          } else {
            setRootIDAndClearFiber(firstRootID);
          }
        }
      }
    });
  }

  const [isCommitFilterEnabled, setIsCommitFilterEnabled] = useLocalStorage('React::DevTools::isCommitFilterEnabled', false);
  const [minCommitDuration, setMinCommitDuration] = useLocalStorage('minCommitDuration', 0);
  const [selectedCommitIndex, selectCommitIndex] = Object(react["useState"])(null);
  const [selectedTabID, selectTab] = useLocalStorage('React::DevTools::Profiler::defaultTab', 'flame-chart', value => {
    Object(Logger["a" /* logEvent */])({
      event_name: 'profiler-tab-changed',
      metadata: {
        tabId: value
      }
    });
  });
  const startProfiling = Object(react["useCallback"])(() => {
    Object(Logger["a" /* logEvent */])({
      event_name: 'profiling-start',
      metadata: {
        current_tab: selectedTabID
      }
    });
    store.profilerStore.startProfiling();
  }, [store, selectedTabID]);
  const stopProfiling = Object(react["useCallback"])(() => store.profilerStore.stopProfiling(), [store]);

  if (isProfiling) {
    Object(react_dom["unstable_batchedUpdates"])(() => {
      if (selectedCommitIndex !== null) {
        selectCommitIndex(null);
      }

      if (selectedFiberID !== null) {
        selectFiberID(null);
        selectFiberName(null);
      }
    });
  }

  const value = Object(react["useMemo"])(() => ({
    selectedTabID,
    selectTab,
    didRecordCommits,
    isProcessingData,
    isProfiling,
    profilingData,
    startProfiling,
    stopProfiling,
    supportsProfiling,
    rootID,
    setRootID: setRootIDAndClearFiber,
    isCommitFilterEnabled,
    setIsCommitFilterEnabled,
    minCommitDuration,
    setMinCommitDuration,
    selectedCommitIndex,
    selectCommitIndex,
    selectedFiberID,
    selectedFiberName,
    selectFiber
  }), [selectedTabID, selectTab, didRecordCommits, isProcessingData, isProfiling, profilingData, startProfiling, stopProfiling, supportsProfiling, rootID, setRootID, setRootIDAndClearFiber, isCommitFilterEnabled, setIsCommitFilterEnabled, minCommitDuration, setMinCommitDuration, selectedCommitIndex, selectCommitIndex, selectedFiberID, selectedFiberName, selectFiber]);
  return /*#__PURE__*/react["createElement"](ProfilerContext.Provider, {
    value: value
  }, children);
}