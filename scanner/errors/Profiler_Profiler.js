function Profiler_Profiler(_) {
  const {
    didRecordCommits,
    isProcessingData,
    isProfiling,
    selectedCommitIndex,
    selectedFiberID,
    selectedTabID,
    selectTab,
    supportsProfiling
  } = Object(react["useContext"])(ProfilerContext);
  const {
    file: timelineTraceEventData,
    searchInputContainerRef
  } = Object(react["useContext"])(TimelineContext);
  const {
    supportsTimeline
  } = Object(react["useContext"])(StoreContext);
  const isLegacyProfilerSelected = selectedTabID !== 'timeline';
  const isRightColumnVisible = isLegacyProfilerSelected || DevToolsFeatureFlags_extension_oss["e" /* enableProfilerComponentTree */];
  let view = null;

  if (didRecordCommits || selectedTabID === 'timeline') {
    switch (selectedTabID) {
      case 'flame-chart':
        view = /*#__PURE__*/react["createElement"](CommitFlamegraphAutoSizer, null);
        break;

      case 'ranked-chart':
        view = /*#__PURE__*/react["createElement"](CommitRankedAutoSizer, null);
        break;

      case 'timeline':
        view = /*#__PURE__*/react["createElement"](Timeline_Timeline, null);
        break;

      default:
        break;
    }
  } else if (isProfiling) {
    view = /*#__PURE__*/react["createElement"](RecordingInProgress, null);
  } else if (isProcessingData) {
    view = /*#__PURE__*/react["createElement"](ProcessingData_ProcessingData, null);
  } else if (timelineTraceEventData) {
    view = /*#__PURE__*/react["createElement"](OnlyTimelineData, null);
  } else if (supportsProfiling) {
    view = /*#__PURE__*/react["createElement"](NoProfilingData, null);
  } else {
    view = /*#__PURE__*/react["createElement"](ProfilingNotSupported, null);
  }

  let sidebar = null;

  if (!isProfiling && !isProcessingData && didRecordCommits) {
    switch (selectedTabID) {
      case 'flame-chart':
      case 'ranked-chart':
        // TRICKY
        // Handle edge case where no commit is selected because of a min-duration filter update.
        // In that case, the selected commit index would be null.
        // We could still show a sidebar for the previously selected fiber,
        // but it would be an odd user experience.
        // TODO (ProfilerContext) This check should not be necessary.
        if (selectedCommitIndex !== null) {
          if (selectedFiberID !== null) {
            sidebar = /*#__PURE__*/react["createElement"](SidebarSelectedFiberInfo_SidebarSelectedFiberInfo, null);
          } else {
            sidebar = /*#__PURE__*/react["createElement"](SidebarCommitInfo_SidebarCommitInfo, null);
          }
        }

        break;

      case 'timeline':
        sidebar = /*#__PURE__*/react["createElement"](SidebarEventInfo_SidebarEventInfo, null);
        break;

      default:
        break;
    }
  }

  return /*#__PURE__*/react["createElement"](SettingsModalContextController, null, /*#__PURE__*/react["createElement"]("div", {
    className: Profiler_default.a.Profiler
  }, /*#__PURE__*/react["createElement"]("div", {
    className: Profiler_default.a.LeftColumn
  }, /*#__PURE__*/react["createElement"]("div", {
    className: Profiler_default.a.Toolbar
  }, /*#__PURE__*/react["createElement"](RecordToggle_RecordToggle, {
    disabled: !supportsProfiling
  }), /*#__PURE__*/react["createElement"](ReloadAndProfileButton, {
    disabled: !supportsProfiling
  }), /*#__PURE__*/react["createElement"](ClearProfilingDataButton, null), /*#__PURE__*/react["createElement"](ProfilingImportExportButtons_ProfilingImportExportButtons, null), /*#__PURE__*/react["createElement"]("div", {
    className: Profiler_default.a.VRule
  }), /*#__PURE__*/react["createElement"](TabBar_TabBar, {
    currentTab: selectedTabID,
    id: "Profiler",
    selectTab: selectTab,
    tabs: supportsTimeline ? tabsWithTimeline : Profiler_tabs,
    type: "profiler"
  }), /*#__PURE__*/react["createElement"](RootSelector_RootSelector, null), /*#__PURE__*/react["createElement"]("div", {
    className: Profiler_default.a.Spacer
  }), !isLegacyProfilerSelected && /*#__PURE__*/react["createElement"]("div", {
    ref: searchInputContainerRef,
    className: Profiler_default.a.TimelineSearchInputContainer
  }), /*#__PURE__*/react["createElement"](SettingsModalContextToggle, null), isLegacyProfilerSelected && didRecordCommits && /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", {
    className: Profiler_default.a.VRule
  }), /*#__PURE__*/react["createElement"](SnapshotSelector_SnapshotSelector, null))), /*#__PURE__*/react["createElement"]("div", {
    className: Profiler_default.a.Content
  }, view, /*#__PURE__*/react["createElement"](ModalDialog_ModalDialog, null))), isRightColumnVisible && /*#__PURE__*/react["createElement"]("div", {
    className: Profiler_default.a.RightColumn
  }, sidebar), /*#__PURE__*/react["createElement"](SettingsModal_SettingsModal, null)));
}