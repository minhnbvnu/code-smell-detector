function initDependencies() {
  if (existsSync(DEPENDENCIES_DIRECTORY)) {
    rmdirSync(DEPENDENCIES_DIRECTORY, {recursive: true});
  }
  mkdirSync(DEPENDENCIES_DIRECTORY);

  DEPENDENCIES.forEach(([from, to]) => {
    const fromPath = join(__dirname, BUILD_DIRECTORY, from);
    const toPath = join(__dirname, DEPENDENCIES_DIRECTORY, to);
    console.log(`Copying ${fromPath} => ${toPath}`);
    copyFileSync(fromPath, toPath);
  });
}