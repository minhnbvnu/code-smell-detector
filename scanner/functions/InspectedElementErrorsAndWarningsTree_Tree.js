function InspectedElementErrorsAndWarningsTree_Tree({
  badgeClassName,
  actions,
  className,
  clearMessages,
  entries,
  isTransitionPending,
  label,
  messageClassName
}) {
  if (entries.length === 0) {
    return null;
  }

  return /*#__PURE__*/react["createElement"]("div", {
    className: `${InspectedElementSharedStyles_default.a.InspectedElementTree} ${className}`
  }, /*#__PURE__*/react["createElement"]("div", {
    className: `${InspectedElementSharedStyles_default.a.HeaderRow} ${InspectedElementErrorsAndWarningsTree_default.a.HeaderRow}`
  }, /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementSharedStyles_default.a.Header
  }, label), /*#__PURE__*/react["createElement"](Button_Button, {
    disabled: isTransitionPending,
    onClick: clearMessages,
    title: `Clear all ${label} for this component`
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "clear"
  }))), entries.map(([message, count], index) => /*#__PURE__*/react["createElement"](ErrorOrWarningView, {
    key: `${label}-${index}`,
    badgeClassName: badgeClassName,
    className: messageClassName,
    count: count,
    message: message
  })));
}