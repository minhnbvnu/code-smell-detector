function SuspendingErrorView({
  callStack,
  componentStack,
  errorMessage
}) {
  const maybeItem = errorMessage !== null ? findGitHubIssue(errorMessage) : null;
  let GitHubUI;

  if (maybeItem != null) {
    GitHubUI = /*#__PURE__*/react["createElement"](UpdateExistingIssue, {
      gitHubIssue: maybeItem
    });
  } else {
    GitHubUI = /*#__PURE__*/react["createElement"](ReportNewIssue, {
      callStack: callStack,
      componentStack: componentStack,
      errorMessage: errorMessage
    });
  }

  return /*#__PURE__*/react["createElement"](react["Fragment"], null, GitHubUI, /*#__PURE__*/react["createElement"](WorkplaceGroup, null));
}