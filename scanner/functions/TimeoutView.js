function TimeoutView({
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
    className: shared_default.a.TimeoutHeader
  }, errorMessage || 'Timed out waiting'), /*#__PURE__*/react["createElement"](Button_Button, {
    className: shared_default.a.CloseButton,
    onClick: dismissError
  }, "Retry", /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    className: shared_default.a.CloseButtonIcon,
    type: "close"
  }))), !!componentStack && /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.TimeoutStack
  }, "The timeout occurred ", componentStack.trim())));
}