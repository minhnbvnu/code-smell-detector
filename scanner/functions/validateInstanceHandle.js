function validateInstanceHandle() {
  var valid =
    InstanceHandle &&
    InstanceHandle.traverseTwoPhase &&
    InstanceHandle.traverseEnterLeave;
  ("production" !== "development" ? invariant(
    valid,
    'InstanceHandle not injected before use!'
  ) : invariant(valid));
}