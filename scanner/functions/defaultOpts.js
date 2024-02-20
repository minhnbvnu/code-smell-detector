function defaultOpts(el, $state) {
  return { relative: stateContext(el) || $state.$current, inherit: true };
}