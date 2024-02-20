function useDragX() {
  const [mouseDownX, setMouseDownX] = react["useState"](null);
  const [dragOffset, setDragOffset] = react["useState"](0);
  react["useEffect"](() => {
    if (mouseDownX == null) {
      return;
    }

    const xStart = mouseDownX;

    const handleMouseMove = ee => {
      const diff = getX(ee) - xStart;
      setDragOffset(-diff);
    }; // TODO: Use `once` or something instead of this flag nonsense


    let cleanedUp = false;

    const handleMouseUp = () => {
      if (cleanedUp) {
        return;
      }

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
      setMouseDownX(null);
      cleanedUp = true;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
    return handleMouseUp;
  }, [mouseDownX]);
  const handleMouseDown = react["useCallback"](e => {
    setMouseDownX(getX(e));
  }, []);
  return {
    handleMouseDown,
    dragOffset,
    dragging: mouseDownX != null
  };
}