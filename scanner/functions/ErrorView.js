function ErrorView({
  callStack,
  children,
  componentStack,
  dismissError = null,
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
  }, "Uncaught Error: ", errorMessage || ''), dismissError !== null && /*#__PURE__*/react["createElement"](Button_Button, {
    className: shared_default.a.CloseButton,
    onClick: dismissError
  }, "Dismiss", /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    className: shared_default.a.CloseButtonIcon,
    type: "close"
  }))), !!callStack && /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.ErrorStack
  }, "The error was thrown ", callStack.trim()), !!componentStack && /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.ErrorStack
  }, "The error occurred ", componentStack.trim())));
}