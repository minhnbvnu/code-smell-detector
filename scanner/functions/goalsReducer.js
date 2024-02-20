function goalsReducer(state, action) {
  if (state.errors) {
    return {error: `"${state.errors[0].message}"`};
  }
  switch (action.type) {
    case "GET":
      return state.repository ? state : state.data.gitHub.viewer;
    case "UPDATE":
      return state;
    case "CREATE":
      return state.data.createRepository;
    default:
      throw new Error("No Action was provided.");
  }
}