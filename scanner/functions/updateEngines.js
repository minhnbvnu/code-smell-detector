function updateEngines(nodeVersion) {
  const pathToPackageJson = path.resolve(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(pathToPackageJson));
  packageJson.engines.node = nodeVersion;
  fs.writeFileSync(
    pathToPackageJson,
    `${JSON.stringify(packageJson, null, 2)}\n`
  );
}