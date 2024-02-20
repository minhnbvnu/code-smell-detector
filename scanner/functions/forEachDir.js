async function forEachDir(dir) {
    _log('Checking package %s in %s', dir, root)

    // Skip npm's binary directory where it stores executables.
    if (dir === '.bin') {
      _log('Skipping .bin directory')
      return
    }

    // Recurse into module scopes.
    if (dir[0] === '@') {
      logger.trace('Recursing into scoped module directory %s', dir)
      return listPackages(path.resolve(root, dir), packages)
    }

    // Read the package and pull out the name and version of it.
    const pkg = path.resolve(root, dir, 'package.json')
    let name = null
    let version = null
    try {
      const pkgFile = await fsPromises.readFile(pkg)
      _log('Read package at %s', pkg)
      ;({ name, version } = JSON.parse(pkgFile))
    } catch (err) {
      logger.debug(err, 'Could not read %s.', pkg)
    }

    packages.push([name || dir, version || '<unknown>'])
    _log('Package from %s added (%s@%s)', pkg, name, version)
  }