function makePortableProxyScript(source, destination,
// $FlowFixMe Flow doesn't support exact types with empty default values
options = {}) {
  return makePortableProxyScriptUnix(source, destination, options);
}