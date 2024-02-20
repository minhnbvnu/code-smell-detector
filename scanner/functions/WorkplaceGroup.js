function WorkplaceGroup() {
  if (!DevToolsFeatureFlags_extension_oss["g" /* isInternalFacebookBuild */]) {
    return null;
  }

  return /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.WorkplaceGroupRow
  }, /*#__PURE__*/react["createElement"](Icon_Icon, {
    className: shared_default.a.ReportIcon,
    type: "facebook"
  }), /*#__PURE__*/react["createElement"]("a", {
    className: shared_default.a.ReportLink,
    href: constants["t" /* REACT_DEVTOOLS_WORKPLACE_URL */],
    rel: "noopener noreferrer",
    target: "_blank",
    title: "Report bug"
  }, "Report this on Workplace"), /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.FacebookOnly
  }, "(Facebook employees only.)"));
}