function parseVersionString(versionString) {
  const versionSplit = versionString.split('.');
  let major = null;
  let minor = null;
  let patch = null;

  let field = versionSplit.shift();
  if (field) {
    major = Number.parseInt(field, 10);
  }

  field = versionSplit.shift();
  if (field) {
    minor = Number.parseInt(field, 10);
  }

  field = versionSplit.shift();
  if (field) {
    patch = Number.parseInt(field, 10);
  }

  return {major, minor, patch};
}