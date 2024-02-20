async function generateDockerfileEnvs(baseDir, serviceName, serviceProps, functionName, functionProps, debugPort, httpParams, nasConfig, ishttpTrigger, debugIde, debugArgs) {
  const DockerEnvs = await generateDockerEnvs(baseDir, serviceName, serviceProps, functionName, functionProps, debugPort, httpParams, nasConfig, ishttpTrigger, debugIde, debugArgs);
  const DockerfilEnvs = [];
  Object.keys(DockerEnvs).forEach((key) => {
    DockerfilEnvs.push(`${key}=${DockerEnvs[key]}`);
  });
  return DockerfilEnvs;
}