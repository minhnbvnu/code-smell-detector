function fetchIssuesBeforeQuery(owner, repo, cursor) {
  return fetchOneGraph(operationsDoc, "IssuesBeforeQuery", {owner: owner, repo: repo, cursor: cursor});
}