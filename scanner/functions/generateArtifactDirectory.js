async function generateArtifactDirectory(rootArtifactsDir, serviceName, functionName) {
  const funcArtifactDir = path.join(rootArtifactsDir, serviceName, functionName);

  await fs.mkdirp(funcArtifactDir);

  return funcArtifactDir;
}