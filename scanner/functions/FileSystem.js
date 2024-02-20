function FileSystem(options) {
  options = options || {};

  const createCwd = 'createCwd' in options ? options.createCwd : true;
  const createTmp = 'createTmp' in options ? options.createTmp : true;

  const root = new Directory();

  // populate with default directories
  const defaults = [];
  if (createCwd) {
    defaults.push(process.cwd());
  }

  if (createTmp) {
    defaults.push((os.tmpdir && os.tmpdir()) || os.tmpDir());
  }

  defaults.forEach(function (dir) {
    const parts = getPathParts(dir);
    let directory = root;
    for (let i = 0, ii = parts.length; i < ii; ++i) {
      const name = parts[i];
      const candidate = directory.getItem(name);
      if (!candidate) {
        directory = directory.addItem(name, new Directory());
      } else if (candidate instanceof Directory) {
        directory = candidate;
      } else {
        throw new Error('Failed to create directory: ' + dir);
      }
    }
  });

  /**
   * Root directory.
   * @type {Directory}
   */
  this._root = root;
}