async function copyNasArtifactFromImage(nasMappings, imageTag) {
  if (nasMappings) {
    for (let nasMapping of nasMappings) {
      const localNasDir = nasMapping.localNasDir;
      let remoteNasDir = nasMapping.remoteNasDir;

      if (!remoteNasDir.endsWith('/')) {
        remoteNasDir += '/';
      }

      try {
        console.log('copy from container ' + remoteNasDir + '.' + ' to ' + localNasDir);
        await docker.copyFromImage(imageTag, remoteNasDir + '.', localNasDir);
      } catch (e) {
        debug(`copy from image ${imageTag} directory ${remoteNasDir} to ${localNasDir} error`, e);
      }
    }
  }
}