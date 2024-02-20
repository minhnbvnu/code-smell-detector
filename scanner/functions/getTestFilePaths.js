function getTestFilePaths(files){
  const target = globby.sync([files])

  // Hardhat supports js & ts
  const testregex = /.*\.(js|ts)$/;
  return target.filter(f => f.match(testregex) != null);
}