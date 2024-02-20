function getHooksContextOrThrow() {
  var hooks = getHooksContextOrNull();

  if (hooks == null) {
    throw invalidHooksError();
  }

  return hooks;
}