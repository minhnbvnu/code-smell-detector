function setAtomHelperVersion(packagedAppPath) {
  const frameworksPath = path.join(packagedAppPath, 'Contents', 'Frameworks');
  const helperPListPath = path.join(
    frameworksPath,
    'Atom Helper.app',
    'Contents',
    'Info.plist'
  );
  console.log(`Setting Atom Helper Version for ${helperPListPath}`);
  spawnSync('/usr/libexec/PlistBuddy', [
    '-c',
    `Add CFBundleVersion string ${CONFIG.appMetadata.version}`,
    helperPListPath
  ]);
  spawnSync('/usr/libexec/PlistBuddy', [
    '-c',
    `Add CFBundleShortVersionString string ${CONFIG.appMetadata.version}`,
    helperPListPath
  ]);
}