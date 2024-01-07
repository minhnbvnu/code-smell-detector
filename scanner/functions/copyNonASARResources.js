function copyNonASARResources(packagedAppPath, bundledResourcesPath) {
  console.log(`Copying non-ASAR resources to ${bundledResourcesPath}`);
  fs.copySync(
    path.join(
      CONFIG.repositoryRootPath,
      'apm',
      'node_modules',
      'atom-package-manager'
    ),
    path.join(bundledResourcesPath, 'app', 'apm'),
    { filter: includePathInPackagedApp }
  );
  if (process.platform !== 'win32') {
    // Existing symlinks on user systems point to an outdated path, so just symlink it to the real location of the apm binary.
    // TODO: Change command installer to point to appropriate path and remove this fallback after a few releases.
    fs.symlinkSync(
      path.join('..', '..', 'bin', 'apm'),
      path.join(
        bundledResourcesPath,
        'app',
        'apm',
        'node_modules',
        '.bin',
        'apm'
      )
    );
    fs.copySync(
      path.join(CONFIG.repositoryRootPath, 'atom.sh'),
      path.join(bundledResourcesPath, 'app', 'atom.sh')
    );
  }
  if (process.platform === 'darwin') {
    fs.copySync(
      path.join(CONFIG.repositoryRootPath, 'resources', 'mac', 'file.icns'),
      path.join(bundledResourcesPath, 'file.icns')
    );
  } else if (process.platform === 'linux') {
    fs.copySync(
      path.join(
        CONFIG.repositoryRootPath,
        'resources',
        'app-icons',
        CONFIG.channel,
        'png',
        '1024.png'
      ),
      path.join(packagedAppPath, 'atom.png')
    );
  } else if (process.platform === 'win32') {
    [
      'atom.sh',
      'atom.js',
      'apm.cmd',
      'apm.sh',
      'file.ico',
      'folder.ico'
    ].forEach(file =>
      fs.copySync(
        path.join(CONFIG.repositoryRootPath, 'resources', 'win', file),
        path.join(bundledResourcesPath, 'cli', file)
      )
    );

    // Customize atom.cmd for the channel-specific atom.exe name (e.g. atom-beta.exe)
    generateAtomCmdForChannel(bundledResourcesPath);
  }

  console.log(`Writing LICENSE.md to ${bundledResourcesPath}`);
  return getLicenseText().then(licenseText => {
    fs.writeFileSync(
      path.join(bundledResourcesPath, 'LICENSE.md'),
      licenseText
    );
  });
}