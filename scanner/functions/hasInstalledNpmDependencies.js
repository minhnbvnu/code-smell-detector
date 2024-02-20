function hasInstalledNpmDependencies(destination) {
  return existsSync(join(destination, "package-lock.json"));
}