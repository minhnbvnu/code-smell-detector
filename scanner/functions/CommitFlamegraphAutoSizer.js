function CommitFlamegraphAutoSizer(_) {
  const {
    profilerStore
  } = Object(react["useContext"])(StoreContext);
  const {
    rootID,
    selectedCommitIndex,
    selectFiber
  } = Object(react["useContext"])(ProfilerContext);
  const {
    profilingCache
  } = profilerStore;
  const deselectCurrentFiber = Object(react["useCallback"])(event => {
    event.stopPropagation();
    selectFiber(null, null);
  }, [selectFiber]);
  let commitTree = null;
  let chartData = null;

  if (selectedCommitIndex !== null) {
    commitTree = profilingCache.getCommitTree({
      commitIndex: selectedCommitIndex,
      rootID: rootID
    });
    chartData = profilingCache.getFlamegraphChartData({
      commitIndex: selectedCommitIndex,
      commitTree,
      rootID: rootID
    });
  }

  if (commitTree != null && chartData != null && chartData.depth > 0) {
    return /*#__PURE__*/react["createElement"]("div", {
      className: CommitFlamegraph_default.a.Container,
      onClick: deselectCurrentFiber
    }, /*#__PURE__*/react["createElement"](index_esm["a" /* default */], null, ({
      height,
      width
    }) =>
    /*#__PURE__*/
    // Force Flow types to avoid checking for `null` here because there's no static proof that
    // by the time this render prop function is called, the values of the `let` variables have not changed.
    react["createElement"](CommitFlamegraph_CommitFlamegraph, {
      chartData: chartData,
      commitTree: commitTree,
      height: height,
      width: width
    })));
  } else {
    return /*#__PURE__*/react["createElement"](NoCommitData_NoCommitData, null);
  }
}