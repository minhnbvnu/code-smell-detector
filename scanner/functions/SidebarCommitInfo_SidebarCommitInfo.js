function SidebarCommitInfo_SidebarCommitInfo(_) {
  const {
    selectedCommitIndex,
    rootID
  } = Object(react["useContext"])(ProfilerContext);
  const {
    profilerStore
  } = Object(react["useContext"])(StoreContext);

  if (rootID === null || selectedCommitIndex === null) {
    return /*#__PURE__*/react["createElement"]("div", {
      className: SidebarCommitInfo_default.a.NothingSelected
    }, "Nothing selected");
  }

  const {
    duration,
    effectDuration,
    passiveEffectDuration,
    priorityLevel,
    timestamp,
    updaters
  } = profilerStore.getCommitData(rootID, selectedCommitIndex);
  const hasCommitPhaseDurations = effectDuration !== null || passiveEffectDuration !== null;
  const commitTree = updaters !== null ? getCommitTree({
    commitIndex: selectedCommitIndex,
    profilerStore,
    rootID
  }) : null;
  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", {
    className: SidebarCommitInfo_default.a.Toolbar
  }, "Commit information"), /*#__PURE__*/react["createElement"]("div", {
    className: SidebarCommitInfo_default.a.Content
  }, /*#__PURE__*/react["createElement"]("ul", {
    className: SidebarCommitInfo_default.a.List
  }, priorityLevel !== null && /*#__PURE__*/react["createElement"]("li", {
    className: SidebarCommitInfo_default.a.ListItem
  }, /*#__PURE__*/react["createElement"]("label", {
    className: SidebarCommitInfo_default.a.Label
  }, "Priority"), ":", ' ', /*#__PURE__*/react["createElement"]("span", {
    className: SidebarCommitInfo_default.a.Value
  }, priorityLevel)), /*#__PURE__*/react["createElement"]("li", {
    className: SidebarCommitInfo_default.a.ListItem
  }, /*#__PURE__*/react["createElement"]("label", {
    className: SidebarCommitInfo_default.a.Label
  }, "Committed at"), ":", ' ', /*#__PURE__*/react["createElement"]("span", {
    className: SidebarCommitInfo_default.a.Value
  }, formatTime(timestamp), "s")), !hasCommitPhaseDurations && /*#__PURE__*/react["createElement"]("li", {
    className: SidebarCommitInfo_default.a.ListItem
  }, /*#__PURE__*/react["createElement"]("label", {
    className: SidebarCommitInfo_default.a.Label
  }, "Render duration"), ":", ' ', /*#__PURE__*/react["createElement"]("span", {
    className: SidebarCommitInfo_default.a.Value
  }, formatDuration(duration), "ms")), hasCommitPhaseDurations && /*#__PURE__*/react["createElement"]("li", {
    className: SidebarCommitInfo_default.a.ListItem
  }, /*#__PURE__*/react["createElement"]("label", {
    className: SidebarCommitInfo_default.a.Label
  }, "Durations"), /*#__PURE__*/react["createElement"]("ul", {
    className: SidebarCommitInfo_default.a.DurationsList
  }, /*#__PURE__*/react["createElement"]("li", {
    className: SidebarCommitInfo_default.a.DurationsListItem
  }, /*#__PURE__*/react["createElement"]("label", {
    className: SidebarCommitInfo_default.a.Label
  }, "Render"), ":", ' ', /*#__PURE__*/react["createElement"]("span", {
    className: SidebarCommitInfo_default.a.Value
  }, formatDuration(duration), "ms")), effectDuration !== null && /*#__PURE__*/react["createElement"]("li", {
    className: SidebarCommitInfo_default.a.DurationsListItem
  }, /*#__PURE__*/react["createElement"]("label", {
    className: SidebarCommitInfo_default.a.Label
  }, "Layout effects"), ":", ' ', /*#__PURE__*/react["createElement"]("span", {
    className: SidebarCommitInfo_default.a.Value
  }, formatDuration(effectDuration), "ms")), passiveEffectDuration !== null && /*#__PURE__*/react["createElement"]("li", {
    className: SidebarCommitInfo_default.a.DurationsListItem
  }, /*#__PURE__*/react["createElement"]("label", {
    className: SidebarCommitInfo_default.a.Label
  }, "Passive effects"), ":", ' ', /*#__PURE__*/react["createElement"]("span", {
    className: SidebarCommitInfo_default.a.Value
  }, formatDuration(passiveEffectDuration), "ms")))), updaters !== null && commitTree !== null && /*#__PURE__*/react["createElement"]("li", {
    className: SidebarCommitInfo_default.a.ListItem
  }, /*#__PURE__*/react["createElement"]("label", {
    className: SidebarCommitInfo_default.a.Label
  }, "What caused this update"), "?", /*#__PURE__*/react["createElement"](Updaters_Updaters, {
    commitTree: commitTree,
    updaters: updaters
  })))));
}