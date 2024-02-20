function CommitRankedAutoSizer(_) {
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
    chartData = profilingCache.getRankedChartData({
      commitIndex: selectedCommitIndex,
      commitTree,
      rootID: rootID
    });
  }

  if (commitTree != null && chartData != null && chartData.nodes.length > 0) {
    return /*#__PURE__*/react["createElement"]("div", {
      className: CommitRanked_default.a.Container,
      onClick: deselectCurrentFiber
    }, /*#__PURE__*/react["createElement"](index_esm["a" /* default */], null, ({
      height,
      width
    }) => /*#__PURE__*/react["createElement"](CommitRanked_CommitRanked, {
      chartData: chartData,
      commitTree: commitTree,
      height: height,
      width: width
    })));
  } else {
    return /*#__PURE__*/react["createElement"](NoCommitData_NoCommitData, null);
  }
}