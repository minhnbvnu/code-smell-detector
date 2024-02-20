function findClosestWorkspaceDir(path) {
  return new Promise((resolve$, reject) => {
    const closestWorkspaceDir = getParentDirectories(path).find(isWorkspaceDir);
    if (closestWorkspaceDir) return resolve$(closestWorkspaceDir);
    return reject(
      new Error(
        `could not find workspace directory around "${path}". Workspace directory must contain ".xodworkspace" file.`
      )
    );
  });
}