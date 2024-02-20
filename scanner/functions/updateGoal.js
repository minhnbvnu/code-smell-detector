function updateGoal(id, title, state, notes) {
  return fetchOneGraph(operationsDoc, "UpdateGoal", {
    id: id,
    state: state,
    title: title,
    notes: notes,
  });
}