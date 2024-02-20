function UnsupportedBridgeOperationView({
  callStack,
  children,
  componentStack,
  errorMessage
}) {
  return /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.ErrorBoundary
  }, children, /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.ErrorInfo
  }, /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.HeaderRow
  }, /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.ErrorHeader
  }, errorMessage || 'Bridge protocol mismatch')), /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.InfoBox
  }, "An incompatible version of ", /*#__PURE__*/react["createElement"]("code", null, "react-devtools-core"), " has been embedded in a renderer like React Native. To fix this, update the", ' ', /*#__PURE__*/react["createElement"]("code", null, "react-devtools-core"), " package within the React Native application, or downgrade the ", /*#__PURE__*/react["createElement"]("code", null, "react-devtools"), " package you use to open the DevTools UI."), !!callStack && /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.ErrorStack
  }, "The error was thrown ", callStack.trim())));
}