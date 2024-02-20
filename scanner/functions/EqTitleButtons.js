function EqTitleButtons() {
  const focusedWindow = useTypedSelector(getFocusedWindow);
  const selected = focusedWindow === WINDOWS.EQUALIZER;
  const closeWindow = useActionCreator(windows_closeWindow);
  const toggleEqualizerShadeMode = useActionCreator(windows_toggleEqualizerShadeMode);
  return /*#__PURE__*/Object(jsx_runtime["jsxs"])(components_ClickedDiv, {
    id: "eq-buttons",
    children: [/*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      id: "equalizer-shade",
      onClick: toggleEqualizerShadeMode
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      id: "equalizer-close",
      onClick: () => closeWindow(WINDOWS.EQUALIZER)
    })]
  }, selected ? "selected" : "unselected");
}