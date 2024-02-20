function getBinaryFromArgs(args) {

  var argo = argsToObjectDefaults(args);

  if (!binariesJson) {
    throw new Error(
      "File '" + binariesJsonName +
      "' not found. Reinstall EncloseJS"
    );
  }

  var arch = argo.arch;
  var suffix = getSuffix(arch);
  var version = argo.version;
  var binary = getBinary(version, suffix);
  if (!binary && argo.tryDefaultVersion) {
    binary = getBinary("default", suffix);
  }

  if (!binary) {
    throw new Error(
      "Bad version '" + version + "' or " +
      "architecture '" + arch + "'. " +
      "See file '" + binariesJsonName + "'"
    );
  }

  binary.suffix = suffix;
  return binary;

}