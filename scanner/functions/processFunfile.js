async function processFunfile(serviceName, serviceRes, codeUri, funfilePath, baseDir, funcArtifactDir, runtime, functionName) {
  console.log(yellow('Funfile exist, Fun will use container to build forcely'));

  const dockerfilePath = path.join(codeUri, '.Funfile.generated.dockerfile');
  await convertFunfileToDockerfile(funfilePath, dockerfilePath, runtime, serviceName, functionName);

  const nasConfig = (serviceRes.Properties || {}).NasConfig;
  let nasMappings;
  if (nasConfig) {
    nasMappings = await nas.convertNasConfigToNasMappings(nas.getDefaultNasDir(baseDir), nasConfig, serviceName);
  }

  const tag = `fun-cache-${uuid.v4()}`;
  const imageTag = await docker.buildImage(codeUri, dockerfilePath, tag);

  // copy fun install generated artifact files to artifact dir
  console.log(`copying function artifact to ${funcArtifactDir}`);
  await docker.copyFromImage(imageTag, '/code/.', funcArtifactDir);

  // process nas folder
  await copyNasArtifact(nasMappings, imageTag, baseDir, funcArtifactDir);
  await fs.remove(dockerfilePath);

  return imageTag;
}