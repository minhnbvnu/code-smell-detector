async function generateRootArtifactDirectory(baseDir) {
  const rootArtifactsDir = path.join(baseDir, '.fun', 'build', 'artifacts');

  await fs.mkdirp(rootArtifactsDir);

  return rootArtifactsDir;
}