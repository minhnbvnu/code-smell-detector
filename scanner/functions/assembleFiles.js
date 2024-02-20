function assembleFiles(config, skipFiles=[]){
  let targets;
  let targetsPath;

  // The targets (contractsDir) could actually be a single named file (OR a folder)
  const extName = path.extname(config.contractsDir);

  if (extName.length !== 0) {
    targets = [ path.normalize(config.contractsDir) ];
  } else {
    targetsPath = path.join(config.contractsDir, '**', '*.{sol,vy}');
    targets = shell.ls(targetsPath).map(path.normalize);
  }

  skipFiles = assembleSkipped(config, targets, skipFiles);

  return assembleTargets(config, targets, skipFiles)
}