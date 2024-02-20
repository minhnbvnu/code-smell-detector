function coverageNotGenerated(config){
  const workingDir = config.working_directory || config.paths.root;
  const jsonPath = path.join(workingDir, "coverage.json");

  assert(pathExists('./coverage') !== true, 'should NOT gen coverage folder');
  assert(pathExists(jsonPath) !== true, 'should NOT gen coverage.json');
}