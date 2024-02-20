function addCompletionRecords(path, paths) {
  if (path) return paths.concat(path.getCompletionRecords());
  return paths;
}