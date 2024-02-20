function CommitFlamegraph_CommitFlamegraph({
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
    selectFiber,
    selectedFiberID
  } = Object(react["useContext"])(ProfilerContext);
  const {
    highlightNativeElement,
    clearHighlightNativeElement
  } = useHighlightNativeElement();
  const selectedChartNodeIndex = Object(react["useMemo"])(() => {
    if (selectedFiberID === null) {
      return 0;
    } // The selected node might not be in the tree for this commit,
    // so it's important that we have a fallback plan.


    const depth = chartData.idToDepthMap.get(selectedFiberID);
    return depth !== undefined ? depth - 1 : 0;
  }, [chartData, selectedFiberID]);
  const selectedChartNode = Object(react["useMemo"])(() => {
    if (selectedFiberID !== null) {
      return chartData.rows[selectedChartNodeIndex].find(chartNode => chartNode.id === selectedFiberID) || null;
    }

    return null;
  }, [chartData, selectedFiberID, selectedChartNodeIndex]);
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
    scaleX: scale(0, selectedChartNode !== null ? selectedChartNode.treeBaseDuration : chartData.baseDuration, 0, width),
    selectedChartNode,
    selectedChartNodeIndex,
    selectFiber,
    width
  }), [chartData, handleElementMouseEnter, handleElementMouseLeave, selectedChartNode, selectedChartNodeIndex, selectFiber, width]); // Tooltip used to show summary of fiber info on hover

  const tooltipLabel = Object(react["useMemo"])(() => hoveredFiberData !== null ? /*#__PURE__*/react["createElement"](HoveredFiberInfo_HoveredFiberInfo, {
    fiberData: hoveredFiberData
  }) : null, [hoveredFiberData]);
  return /*#__PURE__*/react["createElement"](Tooltip_Tooltip, {
    label: tooltipLabel
  }, /*#__PURE__*/react["createElement"](FixedSizeList, {
    height: height,
    innerElementType: CommitFlamegraph_InnerElementType,
    itemCount: chartData.depth,
    itemData: itemData,
    itemSize: lineHeight,
    width: width
  }, Profiler_CommitFlamegraphListItem));
}