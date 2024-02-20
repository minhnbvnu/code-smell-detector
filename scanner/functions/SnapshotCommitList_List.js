function SnapshotCommitList_List({
  commitData,
  selectedCommitIndex,
  commitTimes,
  height,
  filteredCommitIndices,
  selectedFilteredCommitIndex,
  selectCommitIndex,
  totalDurations,
  width
}) {
  // $FlowFixMe[incompatible-use]
  const listRef = Object(react["useRef"])(null);
  const divRef = Object(react["useRef"])(null);
  const prevCommitIndexRef = Object(react["useRef"])(null); // Make sure a newly selected snapshot is fully visible within the list.

  Object(react["useEffect"])(() => {
    if (selectedFilteredCommitIndex !== prevCommitIndexRef.current) {
      prevCommitIndexRef.current = selectedFilteredCommitIndex;

      if (selectedFilteredCommitIndex !== null && listRef.current !== null) {
        listRef.current.scrollToItem(selectedFilteredCommitIndex);
      }
    }
  }, [listRef, selectedFilteredCommitIndex]);
  const itemSize = Object(react["useMemo"])(() => Math.max(minBarWidth, width / filteredCommitIndices.length), [filteredCommitIndices, width]);
  const maxDuration = Object(react["useMemo"])(() => totalDurations.reduce((max, duration) => Math.max(max, duration), 0), [totalDurations]);
  const maxCommitIndex = filteredCommitIndices.length - 1;
  const [dragState, setDragState] = Object(react["useState"])(null);

  const handleDragCommit = ({
    buttons,
    pageX
  }) => {
    if (buttons === 0) {
      setDragState(null);
      return;
    }

    if (dragState !== null) {
      const {
        commitIndex,
        left,
        sizeIncrement
      } = dragState;
      let newCommitIndex = commitIndex;
      let newCommitLeft = left;

      if (pageX < newCommitLeft) {
        while (pageX < newCommitLeft) {
          newCommitLeft -= sizeIncrement;
          newCommitIndex -= 1;
        }
      } else {
        let newCommitRectRight = newCommitLeft + sizeIncrement;

        while (pageX > newCommitRectRight) {
          newCommitRectRight += sizeIncrement;
          newCommitIndex += 1;
        }
      }

      if (newCommitIndex < 0) {
        newCommitIndex = 0;
      } else if (newCommitIndex > maxCommitIndex) {
        newCommitIndex = maxCommitIndex;
      }

      selectCommitIndex(newCommitIndex);
    }
  };

  Object(react["useEffect"])(() => {
    if (dragState === null) {
      return;
    }

    const element = divRef.current;

    if (element !== null) {
      const ownerDocument = element.ownerDocument;
      ownerDocument.addEventListener('mousemove', handleDragCommit);
      return () => {
        ownerDocument.removeEventListener('mousemove', handleDragCommit);
      };
    }
  }, [dragState]);
  const [hoveredCommitIndex, setHoveredCommitIndex] = Object(react["useState"])(null); // Pass required contextual data down to the ListItem renderer.

  const itemData = Object(react["useMemo"])(() => ({
    commitTimes,
    filteredCommitIndices,
    maxDuration,
    selectedCommitIndex,
    selectedFilteredCommitIndex,
    selectCommitIndex,
    setHoveredCommitIndex,
    startCommitDrag: setDragState,
    totalDurations
  }), [commitTimes, filteredCommitIndices, maxDuration, selectedCommitIndex, selectedFilteredCommitIndex, selectCommitIndex, setHoveredCommitIndex, totalDurations]);
  let tooltipLabel = null;

  if (hoveredCommitIndex !== null) {
    const {
      duration,
      effectDuration,
      passiveEffectDuration,
      priorityLevel,
      timestamp
    } = commitData[hoveredCommitIndex]; // Only some React versions include commit durations.
    // Show a richer tooltip only for builds that have that info.

    if (effectDuration !== null || passiveEffectDuration !== null || priorityLevel !== null) {
      tooltipLabel = /*#__PURE__*/react["createElement"]("ul", {
        className: SnapshotCommitList_default.a.TooltipList
      }, priorityLevel !== null && /*#__PURE__*/react["createElement"]("li", {
        className: SnapshotCommitList_default.a.TooltipListItem
      }, /*#__PURE__*/react["createElement"]("label", {
        className: SnapshotCommitList_default.a.TooltipLabel
      }, "Priority"), /*#__PURE__*/react["createElement"]("span", {
        className: SnapshotCommitList_default.a.TooltipValue
      }, priorityLevel)), /*#__PURE__*/react["createElement"]("li", {
        className: SnapshotCommitList_default.a.TooltipListItem
      }, /*#__PURE__*/react["createElement"]("label", {
        className: SnapshotCommitList_default.a.TooltipLabel
      }, "Committed at"), /*#__PURE__*/react["createElement"]("span", {
        className: SnapshotCommitList_default.a.TooltipValue
      }, formatTime(timestamp), "s")), /*#__PURE__*/react["createElement"]("li", {
        className: SnapshotCommitList_default.a.TooltipListItem
      }, /*#__PURE__*/react["createElement"]("div", {
        className: SnapshotCommitList_default.a.DurationsWrapper
      }, /*#__PURE__*/react["createElement"]("label", {
        className: SnapshotCommitList_default.a.TooltipLabel
      }, "Durations"), /*#__PURE__*/react["createElement"]("ul", {
        className: SnapshotCommitList_default.a.DurationsList
      }, /*#__PURE__*/react["createElement"]("li", {
        className: SnapshotCommitList_default.a.DurationsListItem
      }, /*#__PURE__*/react["createElement"]("label", {
        className: SnapshotCommitList_default.a.DurationsLabel
      }, "Render"), /*#__PURE__*/react["createElement"]("span", {
        className: SnapshotCommitList_default.a.DurationsValue
      }, formatDuration(duration), "ms")), effectDuration !== null && /*#__PURE__*/react["createElement"]("li", {
        className: SnapshotCommitList_default.a.DurationsListItem
      }, /*#__PURE__*/react["createElement"]("label", {
        className: SnapshotCommitList_default.a.DurationsLabel
      }, "Layout effects"), /*#__PURE__*/react["createElement"]("span", {
        className: SnapshotCommitList_default.a.DurationsValue
      }, formatDuration(effectDuration), "ms")), passiveEffectDuration !== null && /*#__PURE__*/react["createElement"]("li", {
        className: SnapshotCommitList_default.a.DurationsListItem
      }, /*#__PURE__*/react["createElement"]("label", {
        className: SnapshotCommitList_default.a.DurationsLabel
      }, "Passive effects"), /*#__PURE__*/react["createElement"]("span", {
        className: SnapshotCommitList_default.a.DurationsValue
      }, formatDuration(passiveEffectDuration), "ms"))))));
    } else {
      tooltipLabel = `${formatDuration(duration)}ms at ${formatTime(timestamp)}s`;
    }
  }

  return /*#__PURE__*/react["createElement"](Tooltip_Tooltip, {
    className: SnapshotCommitList_default.a.Tooltip,
    label: tooltipLabel
  }, /*#__PURE__*/react["createElement"]("div", {
    ref: divRef,
    style: {
      height,
      width
    },
    onMouseLeave: () => setHoveredCommitIndex(null)
  }, /*#__PURE__*/react["createElement"](FixedSizeList, {
    className: SnapshotCommitList_default.a.List,
    layout: "horizontal",
    height: height,
    itemCount: filteredCommitIndices.length,
    itemData: itemData,
    itemSize: itemSize,
    ref: listRef,
    width: width
  }, Profiler_SnapshotCommitListItem)));
}