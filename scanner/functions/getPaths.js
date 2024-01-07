function getPaths() {
  return new Promise((resolve, reject) => {
    let paths = [];

    const walker = walk(sourceDir);
    walker.on('file', (root, stats, next) => {
      const sourcePath = path.join(root, stats.name);
      if (sourcePath.endsWith('.js')) {
        paths.push(sourcePath);
      }
      next();
    });
    walker.on('errors', () => {
      reject(new Error(`Trouble walking ${sourceDir}`));
    });

    walker.on('end', () => {
      /**
       * Windows has restrictions on length of command line, so passing all the
       * changed paths to a task will fail if this limit is exceeded.
       * To get round this, if this is Windows and there are newer files, just
       * pass the sourceDir to the task so it can do the walking.
       */
      if (isWindows) {
        paths = [sourceDir];
      }

      resolve(paths);
    });
  });
}