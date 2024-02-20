function cleanupInstanceName(name) {
  let match = name.match(/^.+:(.+)::/);
  if (!match) {
    // Support for Namespace names (instead of module) (for the tests).
    // `<App.ApplicationController:ember301>` => `App.ApplicationController`
    match = name.match(/^<(.+):/);
  }
  if (match) {
    return match[1];
  }
  return name;
}