function buildFixture(cmdArg, path) {
  const opts = {
    cwd: path,
    stdio: 'inherit',
  };
  const result = child_process.spawnSync(cmdArg.cmd, cmdArg.args, opts);
  if (result.status !== 0) {
    throw new Error(`Failed to build fixtures!`);
  }
}