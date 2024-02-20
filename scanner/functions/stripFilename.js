function stripFilename(path) {
    if (!path)
      return "";
    const index = path.lastIndexOf("/");
    return path.slice(0, index + 1);
  }