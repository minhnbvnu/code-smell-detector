function getTempLocations(config){
  const contractsRoot = path.parse(config.contractsDir).dir
  const cwd = config.workingDir;
  const contractsDirName = config.coverageContractsTemp || '.coverage_contracts';
  const artifactsDirName = config.temp || '.coverage_artifacts';

  return {
    tempContractsDir: path.join(contractsRoot, contractsDirName),
    tempArtifactsDir: path.join(cwd, artifactsDirName)
  }
}