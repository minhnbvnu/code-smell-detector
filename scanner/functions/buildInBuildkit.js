async function buildInBuildkit(serviceName, serviceRes, functionName, functionRes, baseDir, codeUri, funcArtifactDir, verbose, stages) {
  const targetBuildStage = 'buildresult';
  const dockerfilePath = path.join(codeUri, '.buildkit.generated.dockerfile');
  await buildOpts.generateDockerfileForBuildkit(dockerfilePath, serviceName, 
    serviceRes, 
    functionName, 
    functionRes, 
    baseDir, 
    codeUri, 
    funcArtifactDir, 
    verbose, 
    stages,
    targetBuildStage);
  
  // exec build
  execSync(
    `buildctl build --no-cache --frontend dockerfile.v0 --local context=${baseDir} --local dockerfile=${path.dirname(dockerfilePath)} --opt filename=${path.basename(dockerfilePath)} --opt target=${targetBuildStage} --output type=local,dest=${baseDir}`, {
      stdio: 'inherit'
    });
  // clean
  await fs.remove(dockerfilePath);
  const dockerfileInArtifact = path.join(funcArtifactDir, path.basename(dockerfilePath));
  if (await fs.pathExists(dockerfileInArtifact)) {
    await fs.remove(dockerfileInArtifact);
  }
  const passwdMount = await buildkit.resolvePasswdMount(baseDir);
  if (passwdMount) {
    const pwdFilePath = passwdMount.Source;
    await fs.remove(pwdFilePath);
    const pwdFileInArtifact = path.join(funcArtifactDir, path.basename(pwdFilePath));
    if (await fs.pathExists(pwdFileInArtifact)) {
      await fs.remove(pwdFileInArtifact);
    }
  }
}