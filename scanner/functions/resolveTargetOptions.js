function resolveTargetOptions(target, newOptions) {
  if (!newOptions) {
    return;
  }
  let options = target.options;
  if (!options) {
    target.options = newOptions;
    return;
  }
  if (options.$shared) {
    // Going from shared options to distinct one:
    // Create new options object containing the old shared values and start updating that.
    target.options = options = Object.assign({}, options, {$shared: false, $animations: {}});
  }
  return options;
}