function CaughtErrorView({
  callStack,
  children,
  info,
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
  }, errorMessage)), !!info && /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.InfoBox
  }, info), !!callStack && /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.ErrorStack
  }, "The error was thrown ", callStack.trim())));
}