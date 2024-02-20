function generateNodePaths(envs, prefix) {
  const defaultPath = `/usr/local/lib/node_modules`;
  const customPath = `${prefix}/node_modules`;

  let path;
  if (envs['NODE_PATH']) {
    path = `${envs['NODE_PATH']}:${customPath}:${defaultPath}`;
  } else {
    path = `${customPath}:${defaultPath}`;
  }
  return duplicateRemoval(path);
}