function ResizeTarget(props) {
  const {
    currentSize,
    setWindowSize,
    widthOnly
  } = props,
        passThroughProps = objectWithoutProperties_default()(props, ["currentSize", "setWindowSize", "widthOnly"]);

  const [mouseDown, setMouseDown] = Object(react["useState"])(false);
  const [mouseStart, setMouseStart] = Object(react["useState"])(null);
  Object(react["useEffect"])(() => {
    if (mouseDown === false || mouseStart == null) {
      return;
    }

    const [width, height] = currentSize;

    const handleMove = ee => {
      const x = getX(ee) - mouseStart.x;
      const y = getY(ee) - mouseStart.y;
      const newWidth = Math.max(0, width + Math.round(x / WINDOW_RESIZE_SEGMENT_WIDTH));
      const newHeight = widthOnly ? width : Math.max(0, height + Math.round(y / WINDOW_RESIZE_SEGMENT_HEIGHT));
      const newSize = [newWidth, newHeight];
      props.setWindowSize(newSize);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);

    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    }; // We pruposefully close over the props from when the mouse went down
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseStart, mouseDown]);

  const handleMouseDown = e => {
    setMouseStart({
      x: getX(e),
      y: getY(e)
    });
    setMouseDown(true);
  };

  return /*#__PURE__*/Object(jsx_runtime["jsx"])("div", ResizeTarget_objectSpread({
    onMouseDown: handleMouseDown,
    onTouchStart: handleMouseDown
  }, passThroughProps));
}