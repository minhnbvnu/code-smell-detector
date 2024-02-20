function findProjectRoot(base) {
  let prev = null;
  let dir = base;

  do {
    if ((_fs || _load_fs()).default.existsSync((_path || _load_path()).default.join(dir, (_constants || _load_constants()).NODE_PACKAGE_JSON))) {
      return dir;
    }

    prev = dir;
    dir = (_path || _load_path()).default.dirname(dir);
  } while (dir !== prev);

  return base;
}