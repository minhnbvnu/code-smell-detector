function walkDir(dir, extension, getContent) {
  const fileMap = {};

  walk.walkSync(dir, {
    listeners: {
      file(fpath, stat, next) {
        if (!extension || stat.name.endsWith(extension)) {
          // Build the path to the matching schema
          const fullPath = path.join(fpath, stat.name);
          const relPath = path.relative(dir, fullPath);
          fileMap[relPath] = getContent && getContent(fullPath);
        }
        next();
      }
    }
  });

  console.log(`${Object.keys(fileMap).length} files loaded from ${dir}`);
  return fileMap;
}