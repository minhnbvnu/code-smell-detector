function isBootstrapPath(absFilePath, absCodeUri, isFile = true) {
  let absBootstrapDir;
  if (isFile) {
    absBootstrapDir = path.dirname(absCodeUri);
  } else {
    absBootstrapDir = absCodeUri;
  }
  return path.join(absBootstrapDir, 'bootstrap') === absFilePath;
}