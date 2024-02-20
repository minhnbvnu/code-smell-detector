function getChangeLogUrl(version) {
  if (!version) {
    return null;
  } // Version numbers are in the format of: <major>.<minor>.<patch>-<sha>
  // e.g. "4.23.0-f0dd459e0"
  // GitHub CHANGELOG headers are in the format of: <major>.<minor>.<patch>
  // but the "." are stripped from anchor tags, becomming: <major><minor><patch>


  const versionAnchor = version.replace(/^(\d+)\.(\d+)\.(\d+).*/, '$1$2$3');
  return `${constants["a" /* CHANGE_LOG_URL */]}#${versionAnchor}`;
}