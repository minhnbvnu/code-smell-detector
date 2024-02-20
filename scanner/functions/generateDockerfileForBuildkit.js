async function generateDockerfileForBuildkit(dockerfilePath, serviceName, serviceRes, functionName, functionRes, baseDir, codeUri, funcArtifactDir, verbose, stages, targetBuildStage) {
  console.log('Generating dockerfile in buildkit format.');
  const functionProps = functionRes.Properties;
  const runtime = functionProps.Runtime;

  const envs = await docker.generateDockerfileEnvs(baseDir, serviceName, serviceRes.Properties, functionName, functionProps, null, null);

  const codeMount = await docker.resolveCodeUriToMount(path.resolve(baseDir, codeUri), false);
  const nasConfig = definition.findNasConfigInService(serviceRes);
  const nasMounts = await docker.resolveNasConfigToMounts(baseDir, serviceName, nasConfig, nas.getDefaultNasDir(baseDir));

  const funcArtifactMountDir = '/artifactsMount';

  const artifactDirMount = {
    Type: 'bind',
    Source: funcArtifactDir,
    Target: funcArtifactMountDir,
    ReadOnly: false
  };
  // add password to /etc/passwd
  const passwdMount = await buildkit.resolvePasswdMount(baseDir);
  const mountsInDocker = _.compact([codeMount, artifactDirMount, ...nasMounts, passwdMount]);

  const { fromSrcToDstPairsInBuild, fromSrcToDstPairsInOutput } = buildkit.generateSrcDstPairsFromMounts(mountsInDocker);

  const params = {
    'method': 'build',
    'serviceName': serviceName,
    'functionName': functionName,
    'sourceDir': '/code',
    'runtime': runtime,
    'artifactDir': codeUri === funcArtifactDir ? '/code' : funcArtifactMountDir,
    'stages': stages,
    'verbose': verbose
  };

  const cmd = `fun-install build --json-params '${JSON.stringify(params)}'`;
  const contentDir = baseDir;
  const dockerfileContent = await buildkit.dockerfileForBuildkit(runtime, fromSrcToDstPairsInOutput, fromSrcToDstPairsInBuild, contentDir, targetBuildStage, envs, cmd);

  await fs.writeFile(dockerfilePath, dockerfileContent);
}