function shortenPaths(files, commonPrefix) {
  // always use forward slashes
  Object.keys(files).forEach(function (file) {
    files[file].shortened = files[file].resolved
      .replace(commonPrefix, '')
      .replaceAll('\\', '/');
  });

  return files;
}