function ErrorOrWarningView({
  className,
  badgeClassName,
  count,
  message
}) {
  return /*#__PURE__*/react["createElement"]("div", {
    className: className
  }, count > 1 && /*#__PURE__*/react["createElement"]("div", {
    className: badgeClassName
  }, count), /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementErrorsAndWarningsTree_default.a.Message,
    title: message
  }, message));
}