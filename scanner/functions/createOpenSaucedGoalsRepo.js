function createOpenSaucedGoalsRepo(ownerId) {
  return fetchOneGraph(operationsDoc, "CreateOpenSaucedGoalsRepo", {ownerId: ownerId});
}