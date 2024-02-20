function HocBadges_HocBadges({
  element
}) {
  const {
    hocDisplayNames
  } = element;

  if (hocDisplayNames === null) {
    return null;
  }

  return /*#__PURE__*/react["createElement"]("div", {
    className: HocBadges_default.a.HocBadges
  }, hocDisplayNames !== null && hocDisplayNames.map(hocDisplayName => /*#__PURE__*/react["createElement"]("div", {
    key: hocDisplayName,
    className: HocBadges_default.a.Badge
  }, hocDisplayName)));
}