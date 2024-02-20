function argsToObjectDefaults(args) {
  var o = argsToObject(args);
  if (!o.arch) {
    o.arch = getArch();
  }
  if (!o.version) {
    o.version = getVersion();
    o.tryDefaultVersion = true;
  }
  return o;
}