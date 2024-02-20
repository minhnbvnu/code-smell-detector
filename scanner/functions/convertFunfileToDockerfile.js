async function convertFunfileToDockerfile(funfilePath, dockerfilePath, runtime, serviceName, functionName) {
  const dockerfileContent = await parser.funfileToDockerfile(funfilePath, runtime, serviceName, functionName);

  await fs.writeFile(dockerfilePath, dockerfileContent);
}