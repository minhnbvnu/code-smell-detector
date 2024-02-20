function UpdateExistingIssue({
  gitHubIssue
}) {
  const {
    title,
    url
  } = gitHubIssue;
  return /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.GitHubLinkRow
  }, /*#__PURE__*/react["createElement"](Icon_Icon, {
    className: shared_default.a.ReportIcon,
    type: "bug"
  }), /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.UpdateExistingIssuePrompt
  }, "Update existing issue:"), /*#__PURE__*/react["createElement"]("a", {
    className: shared_default.a.ReportLink,
    href: url,
    rel: "noopener noreferrer",
    target: "_blank",
    title: "Report bug"
  }, title));
}