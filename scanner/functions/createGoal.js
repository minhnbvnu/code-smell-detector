function createGoal(repoId, title, notes) {
  return fetchOneGraph(operationsDoc, "CreateGoal", {repoId: repoId, title: title, notes: notes});
}