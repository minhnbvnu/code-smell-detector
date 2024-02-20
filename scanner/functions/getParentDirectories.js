function getParentDirectories(path) {
  function loop(currentPath, parentDirectories) {
    let stats;
    try {
      stats = statSync(currentPath);
    } catch (error) {
      stats = null;
    }
    if (stats && stats.isDirectory()) parentDirectories.push(currentPath);
    const parentPath = resolve(currentPath, '..');
    if (parentPath === currentPath) return parentDirectories;
    return loop(parentPath, parentDirectories);
  }

  return loop(resolve(process.cwd(), path), []);
}