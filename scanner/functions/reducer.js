function reducer(state = initial, action) {
  if (handlers[action.type]) {
    return handlers[action.type](state);
  }

  return state;
}