function useIsHovered() {
  const cursorRef = useCursorPositionRef();
  const [hover, setHover] = Object(react["useState"])(false);
  const [node, setNode] = Object(react["useState"])(null);
  Object(react["useLayoutEffect"])(() => {
    if (node == null) {
      setHover(false);
      return;
    }

    const domRect = node.getBoundingClientRect();
    const {
      pageX,
      pageY
    } = cursorRef.current;
    setHover(pageX >= domRect.left && pageX <= domRect.right && pageY >= domRect.top && pageY <= domRect.bottom);

    const enter = () => setHover(true);

    const leave = () => setHover(false);

    node.addEventListener("mouseenter", enter);
    node.addEventListener("mouseleave", leave);
    return () => {
      node.removeEventListener("mouseenter", enter);
      node.removeEventListener("mouseleave", leave);
    };
  }, [node, cursorRef]);
  return {
    ref: setNode,
    hover
  };
}