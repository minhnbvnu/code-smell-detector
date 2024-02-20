async function listDependencies(root, children = [], visited = Object.create(null)) {
  _log('Listing dependencies in %s', root)

  try {
    const dirs = await fsPromises.readdir(root)
    await asyncEachLimit(dirs, forEachEntry, 2)
    _log('Done listing dependencies in %s', root)
  } catch (err) {
    logger.trace(err, 'Could not read directories in %s (probably not an error)', root)
  }

  async function forEachEntry(entry) {
    _log('Checking dependencies in %s (%s)', entry, root)

    const candidate = path.resolve(root, entry, 'node_modules')
    try {
      const realCandidate = await fsPromises.realpath(candidate)
      _log('Resolved %s to real path %s', candidate, realCandidate)
      // Make sure we haven't been to this directory before.
      if (visited[realCandidate]) {
        logger.trace('Not revisiting %s (from %s)', realCandidate, candidate)
        return
      }

      visited[realCandidate] = true

      // Load the packages and dependencies for this directory.
      await listPackages(realCandidate, children)
      await listDependencies(realCandidate, children, visited)
      _log('Done with dependencies in %s', realCandidate)
    } catch (err) {
      // Don't care to log about files that don't exist.
      if (err.code !== 'ENOENT') {
        logger.debug(err, 'Failed to resolve candidate real path %s', candidate)
      }
      _log(err, 'Real path for %s failed', candidate)
    }
  }
}