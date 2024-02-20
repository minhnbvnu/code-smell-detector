async function detectDockerVersion(serverVersion) {
  let cur = serverVersion.split('.');
  // 1.13.1
  if (Number.parseInt(cur[0]) === 1 && Number.parseInt(cur[1]) <= 13) {
    throw new Error(red(`\nWe detected that your docker version is ${serverVersion}, for a better experience, please upgrade the docker version.`));
  }
}