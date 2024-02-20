async function copyNasArtifact(nasMappings, imageTag, rootArtifactsDir, funcArtifactDir) {
  await copyNasArtifactFromLocal(rootArtifactsDir, funcArtifactDir);

  await copyNasArtifactFromImage(nasMappings, imageTag);
}