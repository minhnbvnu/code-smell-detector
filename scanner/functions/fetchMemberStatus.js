function fetchMemberStatus() {
  return fetchOneGraph(operationsDoc, "FetchMemberStatusQuery");
}