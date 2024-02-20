function searchGitHubIssuesURL(message) {
  // Remove Fiber IDs from error message (as those will be unique).
  message = message.replace(/"[0-9]+"/g, '');
  const filters = ['in:title', 'is:issue', 'is:open', 'is:public', 'label:"Component: Developer Tools"', 'repo:facebook/react'];
  return GITHUB_ISSUES_API + '?q=' + encodeURIComponent(message) + '%20' + filters.map(encodeURIComponent).join('%20');
}