function resolveWithHome(path) {
  const homePattern = process.platform === 'win32' ? /^~(\/|\\)/ : /^~\//;
  if (homePattern.test(path)) {
    return (0, (_path || _load_path()).resolve)(userHome, path.substr(2));
  }

  return (0, (_path || _load_path()).resolve)(path);
}