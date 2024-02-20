function addYarnWorkspacesCompat() {
  try {
    const rootPkgJson = JSON.parse(
      fs.readFileSync(path.join(NUCLIDE_ROOT, 'package.json')),
    );
    if (Array.isArray(rootPkgJson.workspaces)) {
      const glob = require('glob');
      rootPkgJson.workspaces.forEach(workspace => {
        const folders = glob.sync(workspace, {cwd: NUCLIDE_ROOT});
        folders.forEach(folder => {
          if (fs.existsSync(path.join(folder, 'package.json'))) {
            const moduleName = path.basename(folder);
            // Needs to be a relative path to the root CWD above.
            MODULE_ALIASES[moduleName] = './' + folder;
          }
        });
      });
    }
  } catch (err) {
    // It's OK if something doesn't exist above.
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }
}