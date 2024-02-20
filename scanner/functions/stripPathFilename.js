function stripPathFilename(path) {
    path = normalizePath(path);
    const index = path.lastIndexOf("/");
    return path.slice(0, index + 1);
  }