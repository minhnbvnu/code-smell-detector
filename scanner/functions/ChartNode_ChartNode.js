function ChartNode_ChartNode({
  color,
  height,
  isDimmed = false,
  label,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onDoubleClick,
  textStyle,
  width,
  x,
  y
}) {
  return /*#__PURE__*/react["createElement"]("g", {
    className: ChartNode_default.a.Group,
    transform: `translate(${x},${y})`
  }, /*#__PURE__*/react["createElement"]("rect", {
    width: width,
    height: height,
    fill: color,
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onDoubleClick: onDoubleClick,
    className: ChartNode_default.a.Rect,
    style: {
      opacity: isDimmed ? 0.5 : 1
    }
  }), width >= minWidthToDisplay && /*#__PURE__*/react["createElement"]("foreignObject", {
    width: width,
    height: height,
    className: ChartNode_default.a.ForeignObject,
    style: {
      paddingLeft: x < 0 ? -x : 0,
      opacity: isDimmed ? 0.75 : 1,
      display: width < minWidthToDisplay ? 'none' : 'block'
    },
    y: 0
  }, /*#__PURE__*/react["createElement"]("div", {
    className: ChartNode_default.a.Div,
    style: textStyle
  }, label)));
}