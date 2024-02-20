function createFlipTransition(x, y) {
  const func = function(component) {
    return flipTransition(component, x, y);
  };
  func.defaultProps = flipTransition.defaultProps;
  return func;
}