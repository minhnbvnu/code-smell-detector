function CommitRankedListItem({
  data,
  index,
  style
}) {
  const {
    chartData,
    onElementMouseEnter,
    onElementMouseLeave,
    scaleX,
    selectedFiberIndex,
    selectFiber,
    width
  } = data;
  const node = chartData.nodes[index];
  const {
    lineHeight
  } = Object(react["useContext"])(SettingsContext);
  const handleClick = Object(react["useCallback"])(event => {
    event.stopPropagation();
    const {
      id,
      name
    } = node;
    selectFiber(id, name);
  }, [node, selectFiber]);

  const handleMouseEnter = () => {
    const {
      id,
      name
    } = node;
    onElementMouseEnter({
      id,
      name
    });
  };

  const handleMouseLeave = () => {
    onElementMouseLeave();
  }; // List items are absolutely positioned using the CSS "top" attribute.
  // The "left" value will always be 0.
  // Since height is fixed, and width is based on the node's duration,
  // We can ignore those values as well.


  const top = parseInt(style.top, 10);
  return /*#__PURE__*/react["createElement"](ChartNode_ChartNode, {
    color: getGradientColor(node.value / chartData.maxValue),
    height: lineHeight,
    isDimmed: index < selectedFiberIndex,
    key: node.id,
    label: node.label,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    width: Math.max(minBarWidth, scaleX(node.value, width)),
    x: 0,
    y: top
  });
}