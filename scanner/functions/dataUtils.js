function dataUtils(actionName, matrix, options) {
  const actions = {
    invert,
    pad,
  }

  return actions[actionName](matrix, options);
}