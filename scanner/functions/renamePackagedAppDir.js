function renamePackagedAppDir(packageOutputDirPath) {
  let packagedAppPath;
  if (process.platform === 'darwin') {
    const appBundleName = getAppName() + '.app';
    packagedAppPath = path.join(CONFIG.buildOutputPath, appBundleName);
    if (fs.existsSync(packagedAppPath)) fs.removeSync(packagedAppPath);
    fs.renameSync(
      path.join(packageOutputDirPath, appBundleName),
      packagedAppPath
    );
  } else if (process.platform === 'linux') {
    const appName =
      CONFIG.channel !== 'stable' ? `atom-${CONFIG.channel}` : 'atom';
    let architecture;
    if (HOST_ARCH === 'ia32') {
      architecture = 'i386';
    } else if (HOST_ARCH === 'x64') {
      architecture = 'amd64';
    } else {
      architecture = HOST_ARCH;
    }
    packagedAppPath = path.join(
      CONFIG.buildOutputPath,
      `${appName}-${CONFIG.appMetadata.version}-${architecture}`
    );
    if (fs.existsSync(packagedAppPath)) fs.removeSync(packagedAppPath);
    fs.renameSync(packageOutputDirPath, packagedAppPath);
  } else {
    packagedAppPath = path.join(CONFIG.buildOutputPath, CONFIG.appName);
    if (process.platform === 'win32' && HOST_ARCH !== 'ia32') {
      packagedAppPath += ` ${process.arch}`;
    }
    if (fs.existsSync(packagedAppPath)) fs.removeSync(packagedAppPath);
    fs.renameSync(packageOutputDirPath, packagedAppPath);
  }
  return packagedAppPath;
}