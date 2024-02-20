function SidebarSelectedFiberInfo_SidebarSelectedFiberInfo(_) {
  const {
    profilerStore
  } = Object(react["useContext"])(StoreContext);
  const {
    rootID,
    selectCommitIndex,
    selectedCommitIndex,
    selectedFiberID,
    selectedFiberName,
    selectFiber
  } = Object(react["useContext"])(ProfilerContext);
  const {
    profilingCache
  } = profilerStore;
  const selectedListItemRef = Object(react["useRef"])(null);
  const commitIndices = profilingCache.getFiberCommits({
    fiberID: selectedFiberID,
    rootID: rootID
  }); // $FlowFixMe[missing-local-annot]

  const handleKeyDown = event => {
    switch (event.key) {
      case 'ArrowUp':
        if (selectedCommitIndex !== null) {
          const prevIndex = commitIndices.indexOf(selectedCommitIndex);
          const nextIndex = prevIndex > 0 ? prevIndex - 1 : commitIndices.length - 1;
          selectCommitIndex(commitIndices[nextIndex]);
        }

        event.preventDefault();
        break;

      case 'ArrowDown':
        if (selectedCommitIndex !== null) {
          const prevIndex = commitIndices.indexOf(selectedCommitIndex);
          const nextIndex = prevIndex < commitIndices.length - 1 ? prevIndex + 1 : 0;
          selectCommitIndex(commitIndices[nextIndex]);
        }

        event.preventDefault();
        break;

      default:
        break;
    }
  };

  Object(react["useEffect"])(() => {
    const selectedElement = selectedListItemRef.current;

    if (selectedElement !== null && // $FlowFixMe[method-unbinding]
    typeof selectedElement.scrollIntoView === 'function') {
      selectedElement.scrollIntoView({
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [selectedCommitIndex]);
  const listItems = [];
  let i = 0;

  for (i = 0; i < commitIndices.length; i++) {
    const commitIndex = commitIndices[i];
    const {
      duration,
      timestamp
    } = profilerStore.getCommitData(rootID, commitIndex);
    listItems.push( /*#__PURE__*/react["createElement"]("button", {
      key: commitIndex,
      ref: selectedCommitIndex === commitIndex ? selectedListItemRef : null,
      className: selectedCommitIndex === commitIndex ? SidebarSelectedFiberInfo_default.a.CurrentCommit : SidebarSelectedFiberInfo_default.a.Commit,
      onClick: () => selectCommitIndex(commitIndex)
    }, formatTime(timestamp), "s for ", formatDuration(duration), "ms"));
  }

  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", {
    className: SidebarSelectedFiberInfo_default.a.Toolbar
  }, /*#__PURE__*/react["createElement"]("div", {
    className: SidebarSelectedFiberInfo_default.a.Component
  }, selectedFiberName || 'Selected component'), /*#__PURE__*/react["createElement"](Button_Button, {
    className: SidebarSelectedFiberInfo_default.a.IconButton,
    onClick: () => selectFiber(null, null),
    title: "Back to commit view"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "close"
  }))), /*#__PURE__*/react["createElement"]("div", {
    className: SidebarSelectedFiberInfo_default.a.Content,
    onKeyDown: handleKeyDown,
    tabIndex: 0
  }, /*#__PURE__*/react["createElement"](WhatChanged_WhatChanged, {
    fiberID: selectedFiberID
  }), listItems.length > 0 && /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("label", {
    className: SidebarSelectedFiberInfo_default.a.Label
  }, "Rendered at"), ": ", listItems), listItems.length === 0 && /*#__PURE__*/react["createElement"]("div", null, "Did not render during this profiling session.")));
}