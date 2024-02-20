async function processFunfileForBuildkit(serviceName, serviceRes, codeUri, funfilePath, baseDir, funcArtifactDir, runtime, functionName) {
  console.log(yellow('Funfile exist and useBuildkit is specified, Fun will use buildkit to build'));
  const dockerfilePath = path.join(codeUri, '.Funfile.buildkit.generated.dockerfile');

  await convertFunfileToDockerfile(funfilePath, dockerfilePath, runtime, serviceName, functionName);

  const fromSrcToDstPairs = [{
    'src': '/code',
    'dst': funcArtifactDir
  }];

  const nasConfig = (serviceRes.Properties || {}).NasConfig;
  let nasMappings;
  if (nasConfig) {
    nasMappings = await nas.convertNasConfigToNasMappings(nas.getDefaultNasDir(baseDir), nasConfig, serviceName);
    if (nasMappings) {
      for (let nasMapping of nasMappings) {
        const localNasDir = nasMapping.localNasDir;
        let remoteNasDir = nasMapping.remoteNasDir;
  
        if (!remoteNasDir.endsWith('/')) {
          remoteNasDir += '/';
        }
        fromSrcToDstPairs.push({
          'src': remoteNasDir,
          'dst': localNasDir
        });
      }
    }
  }
  // 复制本地 NAS 内容
  await copyNasArtifactFromLocal(baseDir, funcArtifactDir);

  // 生成 dockerfile
  const targetBuildStage = 'buildresult';
  await formatDockerfileForBuildkit(dockerfilePath, fromSrcToDstPairs, baseDir, targetBuildStage);

  execSync(
    `buildctl build --no-cache --frontend dockerfile.v0 --local context=${baseDir} --local dockerfile=${path.dirname(dockerfilePath)} --opt target=${targetBuildStage} --opt filename=${path.basename(dockerfilePath)} --output type=local,dest=${baseDir}`, {
      stdio: 'inherit'
    });

  await fs.remove(dockerfilePath);
}