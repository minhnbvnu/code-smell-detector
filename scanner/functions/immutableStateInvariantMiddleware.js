function immutableStateInvariantMiddleware(options = {}) {
  const {
    isImmutable = isImmutableDefault,
    ignore
  } = options
  const track = trackForMutations.bind(null, isImmutable, ignore);

  return ({getState}) => {
    let state = getState();
    let tracker = track(state);

    let result;
    return (next) => (action) => {
      state = getState();

      result = tracker.detectMutations();
      // Track before potentially not meeting the invariant
      tracker = track(state);

      invariant(
        !result.wasMutated,
        BETWEEN_DISPATCHES_MESSAGE,
        (result.path || []).join('.')
      );

      const dispatchedAction = next(action);
      state = getState();

      result = tracker.detectMutations();
      // Track before potentially not meeting the invariant
      tracker = track(state);

      result.wasMutated && invariant(
        !result.wasMutated,
        INSIDE_DISPATCH_MESSAGE,
        (result.path || []).join('.'),
        stringify(action)
      );

      return dispatchedAction;
    };
  };
}