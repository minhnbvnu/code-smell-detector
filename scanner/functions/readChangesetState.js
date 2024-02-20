async function readChangesetState(cwd = process.cwd()) {
  const preState = await readPreState(cwd);
  const isInPreMode = preState !== undefined && preState.mode === 'pre';

  let changesets = await readChangesets(cwd);

  if (isInPreMode) {
    changesets = changesets.filter(x => !preState.changesets.includes(x.id));
  }

  return {
    preState: isInPreMode ? preState : undefined,
    changesets,
  };
}