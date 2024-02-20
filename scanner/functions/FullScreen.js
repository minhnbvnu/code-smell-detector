function FullScreen(props) {
  const {
    onChange,
    enabled
  } = props;
  const ref = Object(react["useRef"])(null);
  Object(react["useEffect"])(() => {
    function detectFullScreen() {
      if (onChange) {
        onChange(fscreen_lib_default.a.fullscreenElement === ref.current);
      }
    }

    fscreen_lib_default.a.addEventListener("fullscreenchange", detectFullScreen);
    return () => {
      fscreen_lib_default.a.removeEventListener("fullscreenchange", detectFullScreen);
    };
  }, [onChange]); // This must run in response to a click event, so we'll use useLayoutEffect just in case.

  Object(react["useLayoutEffect"])(() => {
    const isEnabled = fscreen_lib_default.a.fullscreenElement === ref.current;

    if (isEnabled && !enabled) {
      leaveFullScreen();
    } else if (!isEnabled && enabled && ref.current != null) {
      enterFullScreen(ref.current);
    }
  }, [enabled]);
  return /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
    ref: ref,
    style: props.enabled ? {
      height: "100%",
      width: "100%"
    } : undefined,
    children: props.children
  });
}