function parseRcPaths(paths, parser) {
  return Object.assign({}, ...paths.map(path => {
    try {
      return parser((0, (_fs || _load_fs()).readFileSync)(path).toString(), path);
    } catch (error) {
      return {};
    }
  }));
}