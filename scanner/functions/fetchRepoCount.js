function fetchRepoCount() {
  return fetchOneGraph(operationsDoc, "FetchRepoCountQuery");
}