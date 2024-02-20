function ReportNewIssue({
  callStack,
  componentStack,
  errorMessage
}) {
  let bugURL = "https://github.com/facebook/react";

  if (!bugURL) {
    return null;
  }

  const gitHubAPISearch = errorMessage !== null ? searchGitHubIssuesURL(errorMessage) : '(none)';
  const title = `[DevTools Bug] ${errorMessage || ''}`;
  const parameters = [`template=${TEMPLATE}`, `labels=${encodeURIComponent(LABELS.join(','))}`, `title=${encodeURIComponent(title)}`, `automated_package=${"react-devtools-extensions" || false}`, `automated_version=${"4.27.1-f7d56173f" || false}`, `automated_error_message=${encodeURIComponent(errorMessage || '')}`, `automated_call_stack=${encodeURIComponent(callStack || '')}`, `automated_component_stack=${encodeURIComponent(componentStack || '')}`, `automated_github_query_string=${gitHubAPISearch}`];
  bugURL += `/issues/new?${parameters.join('&')}`;
  return /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.GitHubLinkRow
  }, /*#__PURE__*/react["createElement"](Icon_Icon, {
    className: shared_default.a.ReportIcon,
    type: "bug"
  }), /*#__PURE__*/react["createElement"]("a", {
    className: shared_default.a.ReportLink,
    href: bugURL,
    rel: "noopener noreferrer",
    target: "_blank",
    title: "Report bug"
  }, "Report this issue"), /*#__PURE__*/react["createElement"]("div", {
    className: shared_default.a.ReproSteps
  }, "(Please include steps on how to reproduce it and the components used.)"));
}