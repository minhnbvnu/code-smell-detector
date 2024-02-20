function fetchGoalQuery(issueNumber) {
  return fetchOneGraph(operationsDoc, "FetchGoal", {number: issueNumber});
}