function Badge_Badge({
  className,
  hocDisplayNames,
  type,
  children
}) {
  if (hocDisplayNames === null || hocDisplayNames.length === 0) {
    return null;
  }

  const totalBadgeCount = hocDisplayNames.length;
  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", {
    className: `${Badge_default.a.Badge} ${className || ''}`
  }, children), totalBadgeCount > 1 && /*#__PURE__*/react["createElement"]("div", {
    className: Badge_default.a.ExtraLabel
  }, "+", totalBadgeCount - 1));
}