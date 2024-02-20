function fetchUserForkCount(repoName, repoOwner) {
  return fetchOneGraph(operationsDoc, "FetchUserForkCount", {repoName, repoOwner});
}