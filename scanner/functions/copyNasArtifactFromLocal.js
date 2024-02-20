async function copyNasArtifactFromLocal(rootArtifactsDir, funcArtifactDir) {
  // if .fun/nas exist in funcArtifactDir , fun will move to rootartifactsDir
  const funcNasFolder = path.join(funcArtifactDir, DEFAULT_NAS_PATH_SUFFIX);
  const rootNasFolder = path.join(rootArtifactsDir, DEFAULT_NAS_PATH_SUFFIX);

  if (await fs.pathExists(funcNasFolder) && funcNasFolder !== rootNasFolder) {
    console.log(`moving ${funcNasFolder} to ${rootNasFolder}`);

    await fs.ensureDir(rootNasFolder);

    await ncpAsync(funcNasFolder, rootNasFolder);
    await fs.remove(funcNasFolder);
  }
}