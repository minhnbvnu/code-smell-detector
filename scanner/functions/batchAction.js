function batchAction(action, type, entity, state, payload) {
  if (state.getError() !== null) {
    return state;
  }
  try {
    state.setMethod(type);
    for (let facets of payload) {
      let batchState = action(entity, state.createSubState(), facets);
      if (batchState.getError() !== null) {
        throw batchState.getError();
      }
    }
    return state;
  } catch (err) {
    state.setError(err);
    return state;
  }
}