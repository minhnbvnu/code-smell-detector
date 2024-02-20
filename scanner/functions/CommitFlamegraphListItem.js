function CommitFlamegraphListItem({
  data,
  index,
  style
}) {
  const {
    chartData,
    onElementMouseEnter,
    onElementMouseLeave,
    scaleX,
    selectedChartNode,
    selectedChartNodeIndex,
    selectFiber,
    width
  } = data;
  const {
    renderPathNodes,
    maxSelfDuration,
    rows
  } = chartData;
  const {
    lineHeight
  } = Object(react["useContext"])(SettingsContext);
  const handleClick = Object(react["useCallback"])((event, id, name) => {
    event.stopPropagation();
    selectFiber(id, name);
  }, [selectFiber]);

  const handleMouseEnter = nodeData => {
    const {
      id,
      name
    } = nodeData;
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
  const row = rows[index];
  const selectedNodeOffset = scaleX(selectedChartNode !== null ? selectedChartNode.offset : 0, width);
  return /*#__PURE__*/react["createElement"](react["Fragment"], null, row.map(chartNode => {
    const {
      didRender,
      id,
      label,
      name,
      offset,
      selfDuration,
      treeBaseDuration
    } = chartNode;
    const nodeOffset = scaleX(offset, width);
    const nodeWidth = scaleX(treeBaseDuration, width); // Filter out nodes that are too small to see or click.
    // This also helps render large trees faster.

    if (nodeWidth < barWidthThreshold) {
      return null;
    } // Filter out nodes that are outside of the horizontal window.


    if (nodeOffset + nodeWidth < selectedNodeOffset || nodeOffset > selectedNodeOffset + width) {
      return null;
    }

    let color = 'url(#didNotRenderPattern)';
    let textColor = 'var(--color-commit-did-not-render-pattern-text)';

    if (didRender) {
      color = getGradientColor(selfDuration / maxSelfDuration);
      textColor = 'var(--color-commit-gradient-text)';
    } else if (renderPathNodes.has(id)) {
      color = 'var(--color-commit-did-not-render-fill)';
      textColor = 'var(--color-commit-did-not-render-fill-text)';
    }

    return /*#__PURE__*/react["createElement"](ChartNode_ChartNode, {
      color: color,
      height: lineHeight,
      isDimmed: index < selectedChartNodeIndex,
      key: id,
      label: label,
      onClick: event => handleClick(event, id, name),
      onMouseEnter: () => handleMouseEnter(chartNode),
      onMouseLeave: handleMouseLeave,
      textStyle: {
        color: textColor
      },
      width: nodeWidth,
      x: nodeOffset - selectedNodeOffset,
      y: top
    });
  }));
}