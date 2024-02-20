function RobotReducer(state = initState.robotMsg, action) {
  switch (action.type) {
    case INSERT_MSG:
      state.push(action.data);
      return [...state];
    default:
      return state;
  }
}