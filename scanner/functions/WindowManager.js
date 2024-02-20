function WindowManager({
  windows: propsWindows
}) {
  const windowsInfo = useTypedSelector(getWindowsInfo);
  const setFocusedWindow = useActionCreator(windows_setFocusedWindow);
  const handleMouseDown = useHandleMouseDown(propsWindows);
  const windows = windowsInfo.filter(w => propsWindows[w.key]);
  const onBlur = Object(react["useCallback"])( // I give up on trying to type things with `relatedTarget`.
  e => {
    const {
      currentTarget,
      relatedTarget
    } = e;

    if (currentTarget === relatedTarget || currentTarget.contains(relatedTarget)) {
      return;
    }

    setFocusedWindow(null);
  }, [setFocusedWindow]);
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(jsx_runtime["Fragment"], {
    children: windows.map(w => /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      onBlur: onBlur,
      onMouseDown: e => {
        handleMouseDown(w.key, e);
      },
      onTouchStart: e => {
        handleMouseDown(w.key, e);
      },
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translate(${w.x}px, ${w.y}px)`,
        touchAction: "none"
      },
      children: propsWindows[w.key]
    }, w.key))
  });
}