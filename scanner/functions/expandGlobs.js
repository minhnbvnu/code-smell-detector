function expandGlobs(filePaths, ignore) {
  return filePaths.reduce(function(arr, file) {
    // if file path contains "magical chars" (glob) we expand it, otherwise we
    // simply use the file path (`push` is faster than `concat` and avoid `fs`)
    if (glob.hasMagic(file)) {
      return arr.concat(glob.sync(file, {
        ignore: ignore,
        // we want to return the glob itself to report that it didn't find any
        // files, better to giver clear error messages than to fail silently
        nonull: true,
        nodir: true
      }));
    }
    if (
      !ignore ||
      !minimatch(file, ignore, {
        // `dot:true` to follow same behavior as `glob.sync:ignore`
        dot: true
      })
    ) {
      arr.push(file);
    }
    return arr;
  }, []);
}