function usePersistentStateReducer(bucket, reducer) {
  const [state, setState] = usePersistedState(bucket);

  const dispatch = useCallback(
    action => {
      return setState(reducer(state, action));
    },
    [reducer, state, setState],
  );

  return [state, dispatch];
}