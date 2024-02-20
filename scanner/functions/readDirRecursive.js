function readDirRecursive(rootPath) {
  return new Promise((resolve, reject) => {

    const relativePaths = [];

    if (isEmptyDir(rootPath)) { return resolve(relativePaths); }

    walkdir(rootPath, {
      'track_inodes': true
    })
      .on('path', (fullPath, stat) => {

        let relativePath = path.relative(rootPath, fullPath);

        if (process.platform === 'win32') {
          relativePath = relativePath.split(path.sep).join('/');
        }

        if (stat.isDirectory()) {
          if (!_.isEmpty(fs.readdirSync(fullPath))) { return; }
        
          relativePath = `${relativePath}/`;
        
        }

        relativePaths.push(relativePath);
      })
      .on('end', (path, stat) => resolve(relativePaths));
  });
}