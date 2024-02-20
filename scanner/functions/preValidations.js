function preValidations(packageName, target) {
  if (!packageName) {
    throw new Error("A project name is required.");
  }
  if (!TARGETS.includes(target)) {
    throw new Error(
      'New command only supports "JavaScript" target at the moment.'
    );
  }
  const result = spawnSync("git");
  if (result.error) {
    throw new Error("Git is required to create a new Clio project.");
  }
}