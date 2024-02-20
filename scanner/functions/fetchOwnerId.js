function fetchOwnerId(owner) {
  return fetchOneGraph(operationsDoc, "FetchOwnerQuery", {owner: owner});
}