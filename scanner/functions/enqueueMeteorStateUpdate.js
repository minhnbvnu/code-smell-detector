function enqueueMeteorStateUpdate(component) {
  var partialState =
    component.getMeteorState &&
    component.getMeteorState();

  if (! partialState) {
    // The getMeteorState method can return a falsy value to avoid
    // triggering a state update.
    return;
  }

  if (component._meteorFirstRun) {
    // If it's the first time we've called enqueueMeteorStateUpdate since
    // the component was mounted, set the state synchronously.
    component._meteorFirstRun = false;
    component._meteorCalledSetState = true;
    component.setState(partialState);
    return;
  }

  Tracker.afterFlush(function() {
    component._meteorCalledSetState = true;
    component.setState(partialState);
  });
}