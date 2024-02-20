async function isDockerToolBoxAndEnsureDockerVersion() {

  const dockerInfo = await docker.info();

  await detectDockerVersion(dockerInfo.ServerVersion || '');

  const obj = (dockerInfo.Labels || []).map(e => _.split(e, '=', 2))
    .filter(e => e.length === 2)
    .reduce((acc, cur) => (acc[cur[0]] = cur[1], acc), {});

  return process.platform === 'win32' && obj.provider === 'virtualbox';
}