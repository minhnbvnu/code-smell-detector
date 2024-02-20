function findClosestProjectDir(path) {
  return new Promise((resolve$, reject) => {
    const closestProjectDir = getParentDirectories(path).find(isProjectDir);
    if (closestProjectDir) return resolve$(closestProjectDir);
    return reject(
      new Error(
        `could not find project directory around "${path}". Project directory must contain "project.xod" file.`
      )
    );
  });
}