function expandGlobPath(globPath) {
  return new Promise((resolve, reject) => {
    glob(globPath, (error, paths) => {
      if (error) {
        reject(error);
      } else {
        resolve(paths);
      }
    });
  });
}