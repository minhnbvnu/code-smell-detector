function getNodeVersionPromise(name) {
  if (nodeVersionMap[name]) {
    return nodeVersionMap[name];
  }
  // TODO: error handling!
  return exec(`npm show ${name} version`).then(({ stdout }) => {
    const version = '^' + stdout.replace(/\n$/, '');
    nodeVersionMap[name] = version;
    return version;
  });
}