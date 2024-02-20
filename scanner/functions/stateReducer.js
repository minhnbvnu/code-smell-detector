function stateReducer(state, newState) {
  return isFunction(newState) ? newState(state) : { ...state, ...newState };
}