function Tooltip_Tooltip({
  children,
  className,
  label,
  style
}) {
  const containerRef = Object(react["useRef"])(null);
  const tooltipRef = Object(react["useRef"])(null); // update the position of the tooltip based on current mouse position

  const updateTooltipPosition = event => {
    const element = tooltipRef.current;

    if (element != null) {
      // first find the mouse position
      const mousePosition = getMousePosition(containerRef.current, event); // use the mouse position to find the position of tooltip

      const {
        left,
        top
      } = getTooltipPosition(element, mousePosition); // update tooltip position

      element.style.left = left;
      element.style.top = top;
    }
  };

  const onMouseMove = event => {
    updateTooltipPosition(event);
  };

  const tooltipClassName = label === null ? Profiler_Tooltip_default.a.hidden : '';
  return /*#__PURE__*/react["createElement"]("div", {
    className: Profiler_Tooltip_default.a.Container,
    onMouseMove: onMouseMove,
    ref: containerRef
  }, /*#__PURE__*/react["createElement"]("div", {
    className: `${Profiler_Tooltip_default.a.Tooltip} ${tooltipClassName} ${className || ''}`,
    ref: tooltipRef,
    style: style
  }, label), children);
}