function getPackageJson(
  featureConfig,
  name,
  getNodeVersionPromise,
  features
) {
  const {
    dependencies: dependenciesNames,
    devDependencies: devDependenciesNames,
  } = getNpmDependencies(featureConfig, features);

  const dependenciesVersionsPromises = _.map(
    dependenciesNames,
    getNodeVersionPromise
  );
  const devDependenciesVersionsPromises = _.map(
    devDependenciesNames,
    getNodeVersionPromise
  );
  let dependenciesVersions;
  return Promise.all(dependenciesVersionsPromises)
    .then(response => {
      dependenciesVersions = response;
      return Promise.all(devDependenciesVersionsPromises);
    })
    .then(devDependenciesVersions => {
      const dependencies = _.zipObject(dependenciesNames, dependenciesVersions);
      const devDependencies = _.zipObject(
        devDependenciesNames,
        devDependenciesVersions
      );

      const generatedPackageJson = {
        name,
        ..._.merge(
          {},
          packageJson,
          featureConfig.base.packageJson,
          createPackageJsonConfig(featureConfig, features)
        ),
        dependencies,
        devDependencies,
      };

      return generatedPackageJson;
    });
}