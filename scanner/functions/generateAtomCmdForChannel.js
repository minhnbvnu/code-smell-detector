function generateAtomCmdForChannel(bundledResourcesPath) {
  const atomCmdTemplate = fs.readFileSync(
    path.join(CONFIG.repositoryRootPath, 'resources', 'win', 'atom.cmd')
  );
  const atomCmdContents = template(atomCmdTemplate)({
    atomExeName: CONFIG.executableName
  });
  fs.writeFileSync(
    path.join(bundledResourcesPath, 'cli', 'atom.cmd'),
    atomCmdContents
  );
}