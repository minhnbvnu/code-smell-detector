function coverageGenerated(config){
  const workingDir = config.working_directory || config.paths.root;
  const jsonPath = path.join(workingDir, "coverage.json");

  assert(pathExists('./coverage') === true, 'should gen coverage folder');
  assert(pathExists(jsonPath) === true, 'should gen coverage.json');
}