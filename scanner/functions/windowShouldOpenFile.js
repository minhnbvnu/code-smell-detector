function windowShouldOpenFile({ query }) {
  const { filename } = query;
  const stat = fs.statSyncNoException(filename);

  return win =>
    win.containsLocation({
      pathToOpen: filename,
      exists: Boolean(stat),
      isFile: stat.isFile(),
      isDirectory: stat.isDirectory()
    });
}