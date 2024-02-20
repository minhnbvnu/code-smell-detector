function ProgressCircleContainer(_ref) {
  var children = _ref.children;
  return h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    width: "70",
    height: "70",
    viewBox: "0 0 36 36",
    class: "uppy-c-icon uppy-Dashboard-Item-progressIcon--circle"
  }, children);
}