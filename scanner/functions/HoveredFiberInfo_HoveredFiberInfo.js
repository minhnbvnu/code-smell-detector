function HoveredFiberInfo_HoveredFiberInfo({
  fiberData
}) {
  const {
    profilerStore
  } = Object(react["useContext"])(StoreContext);
  const {
    rootID,
    selectedCommitIndex
  } = Object(react["useContext"])(ProfilerContext);
  const {
    id,
    name
  } = fiberData;
  const {
    profilingCache
  } = profilerStore;
  const commitIndices = profilingCache.getFiberCommits({
    fiberID: id,
    rootID: rootID
  });
  let renderDurationInfo = null;
  let i = 0;

  for (i = 0; i < commitIndices.length; i++) {
    const commitIndex = commitIndices[i];

    if (selectedCommitIndex === commitIndex) {
      const {
        fiberActualDurations,
        fiberSelfDurations
      } = profilerStore.getCommitData(rootID, commitIndex);
      const actualDuration = fiberActualDurations.get(id) || 0;
      const selfDuration = fiberSelfDurations.get(id) || 0;
      renderDurationInfo = /*#__PURE__*/react["createElement"]("div", {
        key: commitIndex,
        className: HoveredFiberInfo_default.a.CurrentCommit
      }, formatDuration(selfDuration), "ms of ", formatDuration(actualDuration), "ms");
      break;
    }
  }

  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", {
    className: HoveredFiberInfo_default.a.Toolbar
  }, /*#__PURE__*/react["createElement"]("div", {
    className: HoveredFiberInfo_default.a.Component
  }, name)), /*#__PURE__*/react["createElement"]("div", {
    className: HoveredFiberInfo_default.a.Content
  }, renderDurationInfo || /*#__PURE__*/react["createElement"]("div", null, "Did not render."), /*#__PURE__*/react["createElement"](WhatChanged_WhatChanged, {
    fiberID: id
  })));
}