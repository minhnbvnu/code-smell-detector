function setupTempFolders(config, tempContractsDir, tempArtifactsDir){
  checkContext(config, tempContractsDir, tempArtifactsDir);

  shell.mkdir(tempContractsDir);
  shell.mkdir(tempArtifactsDir);
}