function forkRepository(repoName, repoOwner) {
  return fetchOneGraph(operationsDoc, "ForkRepository", repoName, repoOwner);
}