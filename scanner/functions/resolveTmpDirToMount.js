async function resolveTmpDirToMount(absTmpDir) {
  if (!absTmpDir) { return {}; }
  return {
    Type: 'bind',
    Source: absTmpDir,
    Target: '/tmp',
    ReadOnly: false
  };
}