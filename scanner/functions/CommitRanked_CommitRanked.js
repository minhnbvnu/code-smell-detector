function CommitRanked_CommitRanked({
  chartData,
  commitTree,
  height,
  width
}) {
  const [hoveredFiberData, setHoveredFiberData] = Object(react["useState"])(null);
  const {
    lineHeight
  } = Object(react["useContext"])(SettingsContext);
  const {
    selectedFiberID,
    selectFiber
  } = Object(react["useContext"])(ProfilerContext);
  const {
    highlightNativeElement,
    clearHighlightNativeElement
  } = useHighlightNativeElement();
  const selectedFiberIndex = Object(react["useMemo"])(() => getNodeIndex(chartData, selectedFiberID), [chartData, selectedFiberID]);
  const handleElementMouseEnter = Object(react["useCallback"])(({
    id,
    name
  }) => {
    highlightNativeElement(id); // Highlight last hovered element.

    setHoveredFiberData({
      id,
      name
    }); // Set hovered fiber data for tooltip
  }, [highlightNativeElement]);
  const handleElementMouseLeave = Object(react["useCallback"])(() => {
    clearHighlightNativeElement(); // clear highlighting of element on mouse leave

    setHoveredFiberData(null); // clear hovered fiber data for tooltip
  }, [clearHighlightNativeElement]);
  const itemData = Object(react["useMemo"])(() => ({
    chartData,
    onElementMouseEnter: handleElementMouseEnter,
    onElementMouseLeave: handleElementMouseLeave,
    scaleX: scale(0, chartData.nodes[selectedFiberIndex].value, 0, width),
    selectedFiberID,
    selectedFiberIndex,
    selectFiber,
    width
  }), [chartData, handleElementMouseEnter, handleElementMouseLeave, selectedFiberID, selectedFiberIndex, selectFiber, width]); // Tooltip used to show summary of fiber info on hover

  const tooltipLabel = Object(react["useMemo"])(() => hoveredFiberData !== null ? /*#__PURE__*/react["createElement"](HoveredFiberInfo_HoveredFiberInfo, {
    fiberData: hoveredFiberData
  }) : null, [hoveredFiberData]);
  return /*#__PURE__*/react["createElement"](Tooltip_Tooltip, {
    label: tooltipLabel
  }, /*#__PURE__*/react["createElement"](FixedSizeList, {
    height: height,
    innerElementType: "svg",
    itemCount: chartData.nodes.length,
    itemData: itemData,
    itemSize: lineHeight,
    width: width
  }, Profiler_CommitRankedListItem));
}