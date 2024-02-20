function createMoveTransition(moveTarget) {
  const func = function(component) {
    return moveTransition(component, moveTarget);
  };
  func.defaultProps = moveTransition.defaultProps;
  return func;
}