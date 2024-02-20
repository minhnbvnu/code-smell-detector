function getNewLints(files, cache) {
  return files.reduce((results, fileName) => {
    const cachedResult = cache[fileName];
    const mtime = statSync(fileName).mtime.toString();

    if (cachedResult && cachedResult.mtime === mtime) {
      return results;
    }

    results[fileName] = {
      lint: lint(fileName),
      mtime
    };

    return results;
  }, {});
}