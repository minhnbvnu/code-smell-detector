function UnsupportedVersionDialog_DialogContent(_) {
  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", {
    className: UnsupportedVersionDialog_default.a.Row
  }, /*#__PURE__*/react["createElement"]("div", null, /*#__PURE__*/react["createElement"]("div", {
    className: UnsupportedVersionDialog_default.a.Title
  }, "Unsupported React version detected"), /*#__PURE__*/react["createElement"]("p", null, "This version of React DevTools supports React DOM v15+ and React Native v61+."), /*#__PURE__*/react["createElement"]("p", null, "In order to use DevTools with an older version of React, you'll need to", ' ', /*#__PURE__*/react["createElement"]("a", {
    className: UnsupportedVersionDialog_default.a.ReleaseNotesLink,
    target: "_blank",
    rel: "noopener noreferrer",
    href: constants["E" /* UNSUPPORTED_VERSION_URL */]
  }, "install an older version of the extension"), "."))));
}