function assembleSkipped(config, targets, skipFiles=[]){
  // Make paths absolute
  skipFiles = skipFiles.map(contract => path.join(config.contractsDir, contract));

  // Enumerate files in skipped folders
  const skipFolders = skipFiles.filter(item => {
    return path.extname(item) !== '.sol' || path.extname(item) !== '.vy'
  });

  for (let folder of skipFolders){
    for (let target of targets ) {
      if (target.indexOf(folder) === 0)
        skipFiles.push(target);
     }
  };

  return skipFiles;
}